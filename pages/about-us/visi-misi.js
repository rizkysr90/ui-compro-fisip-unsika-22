import Layout from "../../components/Layout";
import qs from 'qs';
import {fetcher} from './../../lib/api';
import Link from 'next/link';
import { useState } from 'react';
import { formattedDate } from "../../lib/formattedDate";

export default function Artikel({misi,visi}) {
   
    return (
        <Layout>
            <div className="min-h-screen bg-base-100">
                <div className="hero h-96 relative" style={{backgroundImage: 'url(/assets/patrick-tomasso-Oaqk7qqNh_c-unsplash.jpg)'}}>
                    <div className="hero-overlay bg-cover" style={{backgroundImage: 'linear-gradient(0deg, rgba(143,36,146,0.7) 0%, rgba(0,132,68,0) 100%)'}}/>
                    <div className="hero-content text-center absolute -mt-10 text-base-100">
                        <div className="">
                            <h1 className="text-white text-3xl md:text-6xl font-heading leading-tight">Visi & Misi</h1>
                        </div>
                    </div>
                </div>
                <div className="min-h-screen flex flex-col items-center relative z-10 bg-base-300 shadow-lg lg:mx-40  lg:p-10  p-4 -mt-24 rounded-t-lg">
                        <div className='text-secondary text-3xl md:text-6xl font-heading leading-tight'>Visi</div>
                        {
                            visi?.map((elm) => {
                                elm = elm.attributes;
                                return (
                                    <p key={elm.id} className="text-center text-md mt-2">{elm.konten}</p>
                                )
                            })
                        }
                        <div className='mb-2 text-secondary text-3xl md:text-6xl font-heading leading-tight mt-4'>Misi</div>
                        <div className="flex flex-wrap">
                            {
                                misi?.map((elm,idx) => {
                                    elm = elm.attributes;
                                    return (
                                        <div className="w-full bg-accent m-2 p-4 flex-grow rounded-md lg:basis-1/5" key={idx}>
                                            <p className="text-left">{`${idx+1}. ${elm.konten}`}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps() {
    const paramsForVisi = qs.stringify({
        sort: ['publishedAt:desc'],
        pagination: {
            page: 1,
            pageSize: 1
        },
    });
    const paramsForMisi = qs.stringify({
        sort: ['publishedAt:asc'],
    })
    const visiData = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/visis?${paramsForVisi}`)
    const misiData = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/misis?${paramsForMisi}`)
    console.log(visiData);
    return {
        props : {
            visi : visiData?.data ? visiData.data : null,
            misi : misiData?.data ? misiData.data : null
        }
    }
}