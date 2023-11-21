import { connectMongo } from '@/lib/mongodb';
import Quote from '@/models/quotes';
import User from '@/models/user';
import { NextResponse } from 'next/server';


export async function POST(req) {
  try {

    const { id, title, quote } = await req.json();
    console.log(id, title, quote);

    await connectMongo();

    const _quote = await Quote.findOne({ title: title, quote: quote }).exec();

    if (_quote) {
      return NextResponse.json({ message: 'Quote Already Involved' }, { status: 400 });
    }

    const new_quote = new Quote({
      owner: id,
      title,
      quote,
    });

    await new_quote.save();

    console.log(new_quote._id)

    if (new_quote) {
      const updateResult = await User.updateOne(
        { _id: id },
        { $push: { quotes: new_quote._id } }
      );

      console.log('Update Result:', updateResult);

      if (updateResult.modifiedCount === 0) {
        console.error('User document not updated.');
      }
    }

    return NextResponse.json({ message: 'Quote Added' }, { status: 201 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Error while adding quote' }, { status: 500 });
  }
}

// export async function GET() {
//   try {

//     await connectMongo();

//     const quotes=await Quote.find().exec()

//     console.log(quotes);

//     return NextResponse.json(quotes , { status: 201 });
//   } catch (error) {
//     console.log(error)
//     return NextResponse.json({ message: 'Error while adding quote' }, { status: 500 });
//   }
// }

export async function GET() {
  try {
    await connectMongo();

    const quotes = await Quote.find().populate('owner', 'name').sort({ createdAt: -1 }).exec();

    const transformedQuotes = quotes.map(quote => {
      return {
        id: quote._id,
        owner: quote.owner.name,
        title: quote.title,
        quote: quote.quote,
        createdAt: quote.createdAt,
        updatedAt: quote.updatedAt,
      };
    });

    console.log(transformedQuotes);

    return NextResponse.json({ quotes: transformedQuotes }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error while getting quote' }, { status: 500 });
  }
}


export async function DELETE(req) {

  try {
    const id = req.nextUrl.searchParams.get("id")

    await connectMongo()

    const quote = await Quote.findOne({ _id: id })

    if (quote) {
      const owner_id = await quote.owner;
      const user = await User.findById(owner_id)

      if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
      }

      user.quotes.pull(id);

      await user.save();
      console.log(user);
    }

    await Quote.findByIdAndDelete(id);

    return NextResponse.json({ message: "Quote deleted" }, { status: 200 });

  } catch (error) {

    console.log(error);
    return NextResponse.json({ message: 'Error while deleting quote' }, { status: 500 });
  }

}
