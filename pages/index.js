import Hero from '../components/Hero'
import Layout from '../components/Layout'
import Head from 'next/head';
import { fetcher } from '../lib/api';
import { useState } from 'react';
import qs from 'qs';
import { formattedDate } from '../lib/formattedDate';
import Link from 'next/link';
import { convert } from 'html-to-text';

export default function Home({divisions,prokers,metaProker,adkesma,berita}) {
  // console.log(divisions);
  console.log(adkesma);
  const [pageIndex, setPageIndex] = useState(1);
  const [dataProker, setDataProker] = useState(prokers);
  async function handleNextPagination() {
    const queryForArtikel = qs.stringify({
        pagination: {
            page: pageIndex + 1,
            pageSize: 8
        },
        populate: ['cover_image','department'],
    })
      const {data} = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/prokers?${queryForArtikel}`)
      setDataProker(data);
      setPageIndex((prev) => prev + 1)
    }
  async function handleBackPagination() {
    const queryForArtikel = qs.stringify({
        pagination: {
            page: pageIndex - 1,
            pageSize: 8
        },
        populate: ['cover_image','department'],
    })
      const {data} = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/prokers?${queryForArtikel}`)
      setDataProker(data);
      setPageIndex((prev) => prev - 1)
  }
  return (
      <>
      <Head>
        <title>BEM FISIP UNSIKA | Kabinet Aksata Abhinaya</title>
      </Head>
        <Layout>
            <Hero/>
            <div className='flex flex-col items-center lg:mt-0 py-10 px-5 bg-base-300'>
              <div className=''>
                <div id="profile" className='text-primary text-3xl md:text-6xl font-heading leading-tight normal-case'>Profile</div>
              </div>
              <p className='py-6 text-neutral font-para text-center max-w-2xl text-white'>Badan Eksekutif Mahasiswa Fakultas Ilmu Sosial dan Ilmu Politik Universitas Singaperbangsa Karawang
                  merupakan organisasi mahasiswa tingkat fakultas yang terdiri dari Badan Pengurus Harian, 5 Bidang serta 10 Departemen.</p>
              <div className="flex lg:flex-row flex-col w-full lg:px-20 flex-wrap">
                  {
                    divisions ? 
                    divisions.map((elm, idx) => {
                        const {attributes} = elm;
                        const {name,cover,slug} = attributes;
                        const coverDiv = cover.data ? cover.data.attributes.url  : 'https://ik.imagekit.io/rizkysr90/dumivWPg_400x400_t3hcuRr6I.jpg'
                        return (
                          <Link key={idx} href = {name === 'Badan Pengurus Harian' ? '/bph':`/profile/${slug}`}>
                            <a className="lg:mb-0 basis-2/6  my-3">
                              <div className="card lg:mx-3 bg-base-100 rounded-md lg:rounded-lg shadow border-primary border">
                                  <figure className=''>
                                      <img src={coverDiv} alt = {`foto cover ${name}`}
                                       className='w-full object-cover h-48'/>
                                  </figure>
                                  <div className="card-body text-white px-3 py-5 lg:px-auto lg:py-auto " >
                                      <p className="card-title font-para text-base lg:text-lg text-center text-primary inline">{name}</p>
                                  </div>
                              </div>
                            </a>
                          </Link>
                        )
                    }) : null
                  }
              </div>
            </div>
            <div className='flex flex-col items-center lg:mt-0  py-10 px-5  bg-primary'>
              <div className=''>
                <div id="program-kerja" className='text-secondary text-3xl md:text-6xl font-heading text-center leading-tight normal-case'>Program Kerja</div>
                <p className='py-6 w-full text-neutral text-center font-para text-center  text-white'> Program kerja Badan Eksekutif Mahasiswa 
                Fakultas Ilmu Sosial Politik Universitas Singaperbangsa Karawang
               </p>
                <div className='flex flex-row flex-wrap justify-center mt-2 lg:mx-12'>
                    {
                      dataProker.map((elm,idx) => {
                        const data = elm.attributes;
                        return (
                          <Link href = {`/proker/${data.slug}`}>
                            <a className="card basis-2/6 lg:basis-1/5 grow lg:grow-0 shadow-xl mx-2 my-2  lg:mx-4 lg:my-4" key={idx}>
                              <figure className="h-28"><img  src={data.cover_image?.data ? data.cover_image.data.attributes.url : 'https://ik.imagekit.io/rizkysr90/dumivWPg_400x400_t3hcuRr6I.jpg'} alt="Shoes" /></figure>
                              <div className="card-body p-3 bg-secondary">
                                <h2 className="card-title text-sm text-base-300 font-bold">
                                  {data.name}
                                </h2>
                                <div className="text-xs text-accent">{data?.department?.data ? data.department.data.attributes.name : 'proker'}</div>
                              </div>
                            </a>
                          </Link>
                         
                        )
                      })
                    }
                </div>
                <div className='flex justify-center mt-4'>
                    <div className="btn-group mt-auto ">
                        <button className="btn "
                            disabled={pageIndex === 1}
                            onClick={handleBackPagination}
                        >«</button>
                        <button className="btn bg-secondary text-black border-none">{pageIndex}</button>
                        <button className="btn" 
                            disabled={pageIndex === metaProker?.pageCount === true ? true : false}
                        onClick={handleNextPagination}>»</button>
                    </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col items-center py-10 px-5 lg:mt-0 bg-base-300 border-b border-primary'>
            <div id="adkesma"className='text-secondary text-3xl md:text-6xl font-heading text-center leading-tight'>Adkesma Update</div>
            <p className='py-6 w-full text-neutra text-center font-para text-center  text-white'>
            Informasi advokasi mengenai fasilitas, akademis, dan finansial untuk mewujudkan kesejahteraan mahasiswa
            </p>
                <div className='flex flex-row flex-wrap justify-center lg:mx-32'>
                    {
                      adkesma?.map((elm,idx) => {
                        const data = elm.attributes;
                        return (
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
                      })
                    }
                </div>
                {/* <div className='hidden lg:flex  mt-8'>
                    <div className='basis-1/2 flex justify-end items-center flex-wrap bg-secondary px-20 py-2'>
                      {
                        adkesma?.map((elm,idx) => {
                          const data = elm.attributes;
                          return (
                            <Link href = {`/adkesma/${data.slug}`}>
                            <a className="card card-side bg-accent w-full shadow-xl mx-2flex-grow lg:mx-4 my-2" key={idx}>
                                <div className="card-body px-4 py-4">
                                  <h2 className="card-title text-sm font-bold text-secondary">{data.name}</h2>
                                  <p className='text-xs text-ellipsis overflow-hidden'>{convert(data.artikel, {wordwrap: 130, limits : {maxInputLength:170, ellipsis: '...'}})}</p>
                                  <p className='text-xs badge badge-secondary badge-outline mt-1 italic '>Published : {formattedDate(data.publishedAt)}</p>
                                  <div className="card-actions justify-end">
                                    <button className="btn btn-sm btn-primary normal-case">Baca Selengkapnya</button>
                                  </div>
                                </div>
                            </a>
                          </Link>
                          
                          )
                        })
                      }
                    </div>
                    <div className='basis-1/2 flex items-center justify-start'>
                        <img className='h-80 w-full' 
                        src='./assets/undraw_online_information_re_erks.svg'></img>
                    </div>
                </div> */}
            <div className='flex justify-center mt-6'>
              <Link href = '/adkesma'>
                <a className=''> 
                  <button className='btn btn-secondary normal-case'>Lihat Semua</button>
                </a>
              </Link>
            </div>
            </div>
            <div className='flex flex-col items-center py-10 px-5 lg:mt-0 bg-base-300'>
              <div id="berita-fisip" className='text-secondary text-3xl md:text-6xl font-heading text-center leading-tight'>Berita Fisip</div>
              <p className='py-6 w-full text-neutra text-center font-para text-center  text-white'>Rangkuman informasi seputar fakultas ilmu sosial dan ilmu politik Universitas Singaperbangsa Karawang</p>
              <div className='flex flex-row flex-wrap justify-center lg:mx-10'>
                      {
                        berita.map((elm,idx) => {
                          const data = elm.attributes;
                          return (
                            <Link href = {`/berita/${data.slug}`}>
                              <a className="card w-full rounded-md lg:basis-1/4 shadow-xl mx-2 grow lg:grow-0 lg:mx-4 my-2" key={idx}>
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
                        })
                      }
                  </div>
                  <div className='flex justify-center my-8'>
                    <Link href = '/berita'>
                      <a className=''> 
                        <button className='btn btn-secondary'>Lihat Semua</button>
                      </a>
                    </Link>
                  </div>
            </div>
        </Layout>
      </>
  )
}

export async function getServerSideProps() {
  const queryForDivisions = qs.stringify({
      populate: ['cover'],
      sort:['urutan:asc']
  });
  const paramsForProkers = qs.stringify({
    populate: ['cover_image','department'],
    pagination : {
      page: 1,
      pageSize: 8
    }
  });
  const paramsForAdkesma = qs.stringify({
    sort: ['publishedAt:desc'],
    populate: ['cover_image'],
    pagination : {
      page: 1,
      pageSize: 4
    }
  })
  const paramsForBerita = qs.stringify({
    sort: ['publishedAt:desc'],
    populate: ['cover_image'],
    pagination: {
      page: 1,
      pageSize: 6
    }
  })
  const prokerData = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/prokers?${paramsForProkers}`);
  const divisionsData = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/divisions?${queryForDivisions}`);
  const adkesmaData = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/adkesmas?${paramsForAdkesma}`);
  const beritaData = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/beritas?${paramsForBerita}`);

  return {
    props : {
        divisions : divisionsData?.data ? divisionsData?.data : null,
        prokers : prokerData?.data ? prokerData?.data : null,
        metaProker : prokerData?.meta?.pagination ? prokerData?.meta?.pagination : null,
        adkesma : adkesmaData?.data ? adkesmaData?.data : null,
        berita : beritaData?.data ? beritaData?.data : null,
        metaAdkesma : adkesmaData?.meta?.pagination ? adkesmaData?.meta?.pagination : null
    }
  };

}