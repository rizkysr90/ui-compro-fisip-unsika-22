import Layout from '../../components/Layout'
import Head from 'next/head';
import { fetcher } from '../../lib/api';
import qs from 'qs';
import Link from 'next/link';

export default function Home({divisions}) {
    const data = divisions?.attributes;
    console.log(data);
    
  return (
      <>
      <Head>
        <title>BEM FISIP UNSIKA | Kabinet Aksata Abhinaya</title>
      </Head>
        <Layout>
            <div className='flex flex-col items-center mt-10 lg:mt-20 mx-4 mb-32'>
              <div className=' w-full'>
                <div className='text-secondary text-3xl md:text-6xl font-heading text-left lg:text-center leading-tight'>{data?.name}</div>
              </div>
              <p className='mt-4 text-neutral font-para text-left lg:text-center text-sm lg:text-base max-w-2xl'>{data?.tupoksi}</p>
              <div className="flex lg:flex-row flex-col w-full lg:px-10 mt-5 px-4 flex-wrap">
                  {

                    data?.departments?.data ? 
                    data?.departments?.data?.map((elm, idx) => {
                        const {attributes} = elm;
                        const {name,cover,slug} = attributes;
                        const coverDiv = cover.data ? cover.data.attributes.url : 'https://ik.imagekit.io/rizkysr90/dumivWPg_400x400_t3hcuRr6I.jpg'
                        return (
                          <Link key={idx} href = {`/anggota/${slug}`}>
                            <a className="lg:mb-0 basis-2/6 my-3">
                              <div className="card lg:m-5 bg-primary rounded-none shadow-lg">
                                  <figure className=''>
                                      <img src={coverDiv} alt = {`foto cover ${name}`}
                                       className='w-full object-cover h-48'/>
                                  </figure>
                                  <div className="card-body text-white px-3 py-5 lg:px-auto lg:py-auto " >
                                      <p className="card-title text-base lg:text-lg text-center inline">{name}</p>
                                      <a className='btn btn-secondary w-full normal-case'>Lihat</a>
                                  </div>
                              </div>
                            </a>
                          </Link>
                        )
                    }) : null
                  }
              </div>
            </div>
        </Layout>
      </>
  )
}

export async function getServerSideProps({params}) {
  const {slug} = params;
  const queryForDivisions = qs.stringify({
      populate: {
        departments: {
            populate : ['cover']
        }
      }
  });

  const divisionData = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/slugify/slugs/division/${slug}?${queryForDivisions}`);
  return {
    props : {
        divisions : divisionData?.data ? divisionData?.data : null
    }
  }

}