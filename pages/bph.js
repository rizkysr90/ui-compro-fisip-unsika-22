import Layout from '../components/Layout'
import Head from 'next/head';
import { fetcher } from '../lib/api';
import qs from 'qs';
import Link from 'next/link';

export default function Home({divisions}) {

  return (
      <>
      <Head>
        <title>BEM FISIP UNSIKA | Kabinet Aksata Abhinaya</title>
      </Head>
        <Layout>
            <div className='flex flex-col items-center mt-10 mx-4 mb-32'>
              <div className=''>
                <div className='text-secondary text-2xl md:text-3xl text-center font-heading leading-tight'>Badan Pengurus Harian</div>
              </div>
              <p className='py-6 text-neutral font-para text-center text-sm lg:text-base max-w-2xl'>Badan Pengurus Harian (BPH) merupakan salah satu badan yang melakukan fungsi kontrol, koordinasi, pengembangan dan peningkatan sistem manajemen administrasi dan keuangan, serta komunikasi dalam membangun hubungan internal dan eksternal BEM FISIP UNSIKA.</p>
              <div className="flex lg:flex-row flex-col w-full lg:px-10 flex-wrap justify-center">
                  {
                    
                    divisions ? 
                    divisions?.map((elm, idx) => {
                        const data = elm.attributes;
                        return (
                            <div className="lg:mb-0 mb-8 basis-1/5 my-8 flex flex-col items-center" key={idx}>
                              <div className="avatar">
                                <div className="w-48 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                  <img src={data.profile_image.data ? data.profile_image.data.attributes.url : 'https://ik.imagekit.io/rizkysr90/dumivWPg_400x400_t3hcuRr6I.jpg'} />
                                </div>
                              </div>
                              <p className="card-title font-para text-base text-secondary mt-2 lg:text-lg text-center inline">{data.name}</p>
                              <p className="card-title  text-sm text-black lg:text-base text-center inline">{data.jabatan}</p>
                            </div>
                        )
                    }) : null
                  }
              </div>
            </div>
        </Layout>
      </>
  )
}

export async function getServerSideProps() {
  const queryForDivisions = qs.stringify({
        sort : ['urutan:asc'],
        populate : ['profile_image']
  });

  const divisionData = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/bphs?${queryForDivisions}`);
  console.log(divisionData);
  return {
    props : {
        divisions : divisionData?.data ? divisionData?.data : null
    }
  }

}