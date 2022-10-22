import Hero from '../components/Hero'
import Layout from '../components/Layout'
import Head from 'next/head';

export default function Home() {
  return (
      <>
      <Head>
        <title>BEM FISIP UNSIKA | Kabinet Aksata Abhinaya</title>
      </Head>
        <Layout>
            <Hero/>
            <div className='flex flex-col items-center -mt-16 lg:mt-0 mx-4 bg-primary/30 mb-32'>
              <div className=''>
                <div className='text-secondary text-5xl md:text-6xl font-heading leading-tight'>PROFILE</div>
              </div>
              <p className='py-6 text-neutral font-para text-center max-w-2xl'>Badan Eksekutif Mahasiswa Fakultas Ilmu Sosial dan Ilmu Politik Universitas Singaperbangsa Karawang
                  merupakan organisasi mahasiswa tingkat fakultas yang mempunyai 5 Bidang dan 10 Departemen.</p>
            </div>
            <div className='flex flex-col items-center -mt-16 lg:mt-0 mx-4 bg-primary/30 mb-32'>
              <div className=''>
                <div className='text-secondary text-5xl md:text-6xl font-heading leading-tight'>PROGRAM KERJA</div>
              </div>
              <button className="btn btn-outline btn-primary my-10">Lihat Selengkapnya</button>
            </div>

        </Layout>
      </>
  )
}
