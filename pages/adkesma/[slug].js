import Layout from "../../components/Layout"
import qs from 'qs';
import {fetcher} from './../../lib/api';
import Link from "next/link";
import { formattedDate } from "../../lib/formattedDate";


export default function ProdukUnitUsaha({adkesma}) {
    if (!adkesma) {
        return (
            <p>Data not found</p>
        )
    }
    const {attributes : data} = adkesma
    return (
        <Layout>
            <div className="min-h-screen bg-base-100">
                <div className="hero h-96 relative" style={{backgroundImage: `url(${data.cover_image.data.attributes.url})`}}>
                    <div className="absolute w-full h-96 bg-cover" style={{backgroundImage: 'linear-gradient(180deg, rgba(143,36,146,0.7) 0%, rgba(0,0,0,0.8939775739397321) 100%)'}}/>
                    <div className="hero-content text-center absolute -mt-10  w-full text-base-100">
                        <div className="lg:w-2/4 w-full ">
                            <h1 className="mb-5 text-lg text-center lg:text-3xl font-bold lg:leading-relaxed">{data.name}</h1>
                            <div className=" text-xs lg:text-base">Diterbitkan: <br></br>{formattedDate(data.publishedAt)}</div>
                        </div>
                    </div>
                </div>
                <div className="min-h-screen relative text-neutral z-10 flex flex-col items-center bg-white shadow-lg lg:mx-5 lg:px-20 lg:py-10 lg:mx-20 p-4 -mt-28 lg:-mt-24 rounded-lg">
                    <img src={data.cover_image.data.attributes.url} className="max-h-96 max-w-full lg:rounded-none rounded-t-lg"></img>
                    <article
                        className='prose-sm lg:prose-base max-w-full text-left lg:mx-5 lg:mx-24 overflow-hidden my-5 lg:my-10'
                        dangerouslySetInnerHTML={{__html: data.artikel}}>
                    </article>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({params}) {
    const {slug} = params;
    const adkesmaParam = qs.stringify({
        populate: ['cover_image'],
    }, 
    {
        encodeValuesOnly: true
    })
    const adkesmaData = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/slugify/slugs/adkesma/${slug}?${adkesmaParam}`);
    return {
        props : {
            adkesma : adkesmaData?.data ? adkesmaData.data : null
        }
    }
}