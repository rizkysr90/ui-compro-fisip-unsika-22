import Layout from '../../components/Layout'
import Head from 'next/head';
import { fetcher } from '../../lib/api';
import qs from 'qs';
import Link from 'next/link';

export default function Home({divisions}) {
    const data = divisions?.attributes;
    const members = data.members?.data;
    const prokers = data.prokers?.data;
    console.log(data);
    let ketuaBidang = {}, anggota = [];
    if (members) {
        members.forEach(element => {
            const data = element.attributes;
            if (data.jabatan !== 'Anggota') {
              ketuaBidang = data;
            } else {
              anggota.push(data);
            }
        });
    }

  return (
      <>
      <Head>
        <title>BEM FISIP UNSIKA | Kabinet Aksata Abhinaya</title>
      </Head>
        <Layout>
            <div className='flex flex-col items-center mt-10 mx-4 mb-32'>
              <div className=''>
                <div className='text-secondary text-2xl md:text-3xl text-center font-heading leading-tight'>{data?.name}</div>
              </div>
              <p className='py-6 text-neutral font-para text-center text-sm lg:text-base max-w-2xl'>{data?.tupoksi}</p>
              <div className="flex lg:flex-row flex-col w-full lg:px-10 flex-wrap justify-center">
                  {
                     <div className="lg:mb-0 mb-8 basis-1/5 my-8 flex flex-col items-center">
                      <div className="avatar">
                        <div className="w-48 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                          <img src={ketuaBidang.profile_image.data ? ketuaBidang.profile_image.data.attributes.url : 'https://ik.imagekit.io/rizkysr90/dumivWPg_400x400_t3hcuRr6I.jpg'} />
                        </div>
                      </div>
                      <p className="card-title font-para text-base text-secondary mt-2 lg:text-lg text-center inline">{ketuaBidang.name}</p>
                      <p className="card-title  text-sm text-black lg:text-base text-center inline">{ketuaBidang.jabatan}</p>
                     </div>  
                  }
                  {
                    
                    anggota ? 
                    anggota.map((elm, idx) => {
                        const data = elm;
                        return (
                            <div className="lg:mb-0 mb-8 basis-1/5 my-4 flex flex-col items-center" key={idx}>
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
              <div className='text-secondary text-2xl md:text-3xl lg:mt-10 text-center font-heading leading-tight'>Program Kerja</div>
              <div className='flex-col lg:flex-row flex-wrap flex my-4 lg:my-10 w-full lg:w-3/5 mx-auto'>
                {
                  prokers?.map((elm,idx) => {
                    const data = elm.attributes;
                    return (
                      <li className='flex flex-row bg-primary grow rounded-lg p-4 basis-1/4 my-2 lg:mx-2' key={idx}>
                          <span className='w-6 h-6 mb-2 mr-2 rounded-full bg-secondary flex items-center justify-center text-primary'>{idx+1}</span>
                          {data.name}
                      </li>
                    )
                  })
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
      // populate: {
      //   members: {
      //       populate : ['profile_image']
      //   },
      // }
      populate : ['members','members.profile_image','prokers']
  });

  const divisionData = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/slugify/slugs/department/${slug}?${queryForDivisions}`);
  return {
    props : {
        divisions : divisionData?.data ? divisionData?.data : null
    }
  }

}