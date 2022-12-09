import  Link  from "next/link"
import Footer from "./Footer"
import Head from 'next/head';

export default function Layout({children}) {
    return (
        <>
            <Head>
                <link rel="icon" href="/assets/favico.png"/> 
            </Head>
            <div className="drawer">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
                <div className="drawer-content flex flex-col text-base-100 relative">
                    {/* Navbar */}
                    <div className="w-full fixed top-0 z-50 navbar shadow-lg bg-white">
                        <div className="flex-1 ml-2 lg:ml-20">
                            <Link href = "/">
                                <a>
                                    <img src='/assets/logo_kabinet.png' className='h-20'>
                                    </img>
                                </a>
                            </Link>
                        </div>
                        <div className="flex-none lg:hidden">
                            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost bg-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                            </label>
                        </div> 
                        <div className="flex-none hidden lg:block mr-20">
                            <ul className="menu menu-horizontal font-bold text-neutral font-para">
                                {/* Navbar menu content here */}
                                <li>
                                    <Link href='/#profile'>
                                        <a>Profile</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/#program-kerja'>
                                        <a>Program Kerja</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/#adkesma'>
                                        <a>Adkesma Update</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/#berita-fisip'>
                                        <a>Berita Fisip</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/#footer'>
                                        <a className="btn rounded-md btn-primary text-white ml-4 normal-case">Contact Us</a>
                                    </Link>
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                    {/* Page content here */}
                    <div className='pt-20 bg-base-100'>
                        {children}
                        <Footer></Footer>
                    </div>
                </div> 
                <div className="drawer-side">
                    <label htmlFor="my-drawer-3" className="drawer-overlay" /> 
                    <ul className="menu p-4 overflow-y-auto w-3/5 bg-primary text-base-100 font-medium">           
                    {/* Sidebar menu content here */}
                    <li>
                                    <Link href='/'>
                                        <a>Beranda</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/#profile'>
                                        <a>Profile</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/#program-kerja'>
                                        <a>Program Kerja</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/#adkesma'>
                                        <a>Adkesma Update</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/#berita-fisip'>
                                        <a>Berita Fisip</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/#footer'>
                                        <a>Contact Us</a>
                                    </Link>
                                </li>
                    </ul>
                </div>
            </div>
        </>
    )
}