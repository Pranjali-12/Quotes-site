import { connectMongo } from '@/lib/mongodb';
import Quote from '@/models/quotes';
import { NextResponse } from 'next/server';

export async function PUT(req, { params }) {
    try {
        const { id } = params;
        console.log(id);

        await connectMongo()
    
        const { title, quote } = await req.json()

        console.log(title,quote);
    
        const _quote = await Quote.findOne({ _id: id })
    
        if (_quote) {

            console.log(_quote);
    
          await Quote.findByIdAndUpdate(id, { title, quote })
          console.log(_quote);
    
          return NextResponse.json({ message: "Quote updated"}, { status: 200 });
        }
    
        return NextResponse.json({ message: "Quote not found" }, { status: 400 });
    
      } catch (error) {
    
        console.log(error);
        return NextResponse.json({ message: 'Error while deleting quote' }, { status: 500 });
      }

}



export async function GET(req,{ params }) {
    try {

      console.log("Hello")
        const { id } = params;

        console.log(id);

        await connectMongo()

        const quote = await Quote.findOne({ _id: id })

        console.log(quote)

        if (quote) {
            return NextResponse.json(quote, { status: 200 });
        }

        return NextResponse.json("Quote not found", { status: 400 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Error while fetching  quote' }, { status: 500 });
    }
  }