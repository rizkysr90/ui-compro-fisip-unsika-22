import Layout from "../../components/Layout";
import qs from 'qs';
import {fetcher} from './../../lib/api';
import Link from 'next/link';
import { useState } from 'react';
import { formattedDate } from "../../lib/formattedDate";
import { convert } from 'html-to-text';


export default function Artikel({adkesma,paginationData}) {
    const [pageIndex, setPageIndex] = useState(1);
    const [dataArtikel, setDataArtikel] = useState(adkesma);

    if (adkesma?.length <= 0) {
        adkesma = null
    }

    async function handleNextPagination() {
        const adkesmaParams = qs.stringify({
            pagination: {
                page: pageIndex + 1,
                pageSize: 10
            },
            populate: ['cover_image'],
        })
          const {data} = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/adkesmas?${adkesmaParams}`)
          setDataArtikel(data);
          setPageIndex((prev) => prev + 1)
        }
      async function handleBackPagination() {
        const paramsForAdkesma = qs.stringify({
            pagination: {
                page: pageIndex - 1,
                pageSize: 10
            },
            populate: ['cover_image'],
        })
          const {data} = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/adkesmas?${paramsForAdkesma}`)
          setDataArtikel(data);
          setPageIndex((prev) => prev - 1)
      }
    return (
        <Layout>
            <div className="min-h-screen bg-base-100">
                <div className="hero h-96 relative" style={{backgroundImage: 'url(./assets/patrick-tomasso-Oaqk7qqNh_c-unsplash.jpg)'}}>
                    <div className="hero-overlay bg-cover" style={{backgroundImage: 'linear-gradient(0deg, rgba(143,36,146,0.7) 0%, rgba(0,132,68,0) 100%)'}}/>
                    <div className="hero-content text-center absolute -mt-10 text-base-100">
                        <div className="max-w-xl">
                            <h1 className="mb-5 text-2xl lg:text-3xl font-bold lg:leading-relaxed">Adkesma Update</h1>
                            <p>Ketahui segala informasi terbaru tentang BEM FISIP UNSIKA</p>
                        </div>
                    </div>
                </div>
                <div className="min-h-screen flex flex-col items-center relative z-10 bg-white shadow-lg lg:mx-20  lg:p-10  -mt-24 rounded-lg">
                    <div className="flex flex-row flex-wrap justify-center mt-4 lg:mt-0">
                                {
                                    dataArtikel ? 
                                    dataArtikel.map((elm,idx) => {
                                        const data = elm.attributes
                                        return (
                                            // <Link href = {`/adkesma/${data.slug}`} key={idx}>
                                            //     <a className="card basis-2/6 lg:basis-1/5 shadow-xl mx-2 flex-grow lg:mx-4 my-2 border-primary border" key={idx}>
                                            //         <figure className=''>
                                            //             <img src={data.cover_image?.data ? data.cover_image.data.attributes.url : 'https://ik.imagekit.io/rizkysr90/dumivWPg_400x400_t3hcuRr6I.jpg'} alt='gambar cover artikel' 
                                            //             className='w-full object-cover h-44' />
                                            //         </figure>
                                            //         <div className="card-body text-neutral p-4" >
                                            //             <div className="badge badge-primary text-xs">{formattedDate(data.publishedAt)}</div>
                                            //             <h2 className="card-title text-base">{data.name}</h2>
                                            //             {/* <article 
                                            //                 className= 'h-24 mb-4 text-xs leading-relaxed overflow-hidden text-ellipsis'
                                            //                 dangerouslySetInnerHTML={{__html: data.artikel}}>
                                            //             </article> */}
                                            //         </div>
                                            //     </a>
                                            // </Link>
                                            <Link href = {`/adkesma/${data.slug}`}>
                                                <a className="card card-side lg:basis-5/12 bg-accent w-full shadow-xl mx-2 flex-grow lg:mx-4 my-2" key={idx}>
                                                    <div className="card-body px-4 py-4">
                                                    <h2 className="card-title text-sm font-bold text-secondary">{data.name}</h2>
                                                    <p className='text-xs text-ellipsis overflow-hidden h-12'>{convert(data.artikel, {wordwrap: 130, limits : {maxInputLength:500, ellipsis: '...'}})}</p>
                                                    <p className='text-xs badge badge-secondary badge-outline mt-1 italic '>Published : {formattedDate(data.publishedAt)}</p>
                                                    <div className="card-actions justify-end">
                                                        <button className="btn btn-sm btn-primary normal-case mt-2">Baca Selengkapnya</button>
                                                    </div>
                                                    </div>
                                                </a>
                                            </Link>
                                        )
                                    }) : <p className="text-black">Data kosong</p>
                                }
                    </div>
                    <div className='flex justify-center mt-10'>
                        <div className="btn-group mt-auto mb-5">
                            <button className="btn"
                                disabled={pageIndex === 1}
                                onClick={handleBackPagination}
                            >«</button>
                            <button className="btn bg-secondary text-black border-none">{pageIndex}</button>
                            <button className="btn" 
                                disabled={pageIndex === paginationData?.pageCount === true ? true : false}
                            onClick={handleNextPagination}>»</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps() {
    const paramsForAdkesma = qs.stringify({
        sort: ['publishedAt:desc'],
        pagination: {
            page: 1,
            pageSize: 10
        },
        populate: ['cover_image']
    })
    const adkesmaData = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/adkesmas?${paramsForAdkesma}`)
    return {
        props : {
            adkesma : adkesmaData?.data ? adkesmaData.data : null,
            paginationData : adkesmaData?.meta.pagination ? adkesmaData?.meta.pagination : null
        }
    }
}