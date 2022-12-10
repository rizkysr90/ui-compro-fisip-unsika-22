import Link from "next/link"
export default function Hero() {
    return (
        <div className="hero min-h-screen">
            <div className="hero-content text-center w-full">
                <div className=" flex flex-col items-center md:mt-0">
                    <img src="/assets/logo_kabinet.png" className="h-60"></img>
                    <div className="relative h-auto w-full ">
                        
                        <div className="text-primary text-4xl md:text-7xl font-heading leading-tight">
                            WELCOME TO SI-FISIP
                        </div>
                    </div>
                    <p className="py-6 text-neutral font-para text-center max-w-2xl">SI FISIP atau Sistem Informasi FISIP adalah platform yang menyediakan berbagai informasi, berita dan kegiatan yang berkaitan dengan hal akademis atau non akademis di lingkup Fakultas Ilmu Sosial dan Ilmu Politik.
Dikelola oleh Bidang Komunikasi dan Informasi BEM FISIP UNSIKA. </p>
                    <Link href={'/about-us/visi-misi'}>
                        <a className="btn btn-lg btn-primary normal-case mb-4">
                            About us
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}