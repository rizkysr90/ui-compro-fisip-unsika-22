import Layout from "../../components/Layout";
import qs from 'qs';
import {fetcher} from './../../lib/api';
import Link from 'next/link';
import { useState } from 'react';
import { formattedDate } from "../../lib/formattedDate";
import { convert } from 'html-to-text';


export default function Artikel({berita,paginationData}) {
    const [pageIndex, setPageIndex] = useState(1);
    const [dataArtikel, setDataArtikel] = useState(berita);

    if (berita?.length <= 0) {
        berita = null
    }

    async function handleNextPagination() {
        const beritaParams = qs.stringify({
            pagination: {
                page: pageIndex + 1,
                pageSize: 10
            },
            populate: ['cover_image'],
        })
          const {data} = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/beritas?${beritaParams}`)
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
          const {data} = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/beritas?${paramsForAdkesma}`)
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
                            <h1 className="mb-5 text-2xl lg:text-3xl font-bold lg:leading-relaxed">Berita FISIP</h1>
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
                                            <Link href = {`/berita/${data.slug}`} key={idx}>
                                                <a className="card w-full rounded-md lg:basis-1/4 shadow-xl mx-2 grow lg:grow-0 lg:mx-4 my-2" >
                                                <figure className=""><img  className = "h-48 w-full" src={data.cover_image?.data ? data.cover_image.data.attributes.url : 'https://ik.imagekit.io/rizkysr90/dumivWPg_400x400_t3hcuRr6I.jpg'} alt="Gambar cover" /></figure>
                                                <div className="card-body p-3 bg-accent">
                                                    <h2 className="card-title text-sm lg:text-base  font-bold">
                                                    {data.name}
                                                    </h2>
                                                    <p className='text-xs text-ellipsis overflow-hidden h-16'>{convert(data.artikel, {wordwrap: 130, limits : {maxInputLength:500, ellipsis: '...'}})}</p>
                                                    <div className="text-xs badge badge-secondary text-white badge-outline mt-2">{data?.kategori}</div>
                                                    <p className='text-xs badge badge-secondary badge-outline italic '>Published : {formattedDate(data.publishedAt)}</p>
                                                    <div className="card-actions justify-end mt-2">
                                                    <button className="btn btn-md w-full btn-primary normal-case">Baca Selengkapnya</button>
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
    const paramsForBerita = qs.stringify({
        sort: ['publishedAt:desc'],
        pagination: {
            page: 1,
            pageSize: 10
        },
        populate: ['cover_image']
    })
    const beritaData = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/beritas?${paramsForBerita}`)
    return {
        props : {
            berita : beritaData?.data ? beritaData.data : null,
            paginationData : beritaData?.meta.pagination ? beritaData?.meta.pagination : null
        }
    }
}