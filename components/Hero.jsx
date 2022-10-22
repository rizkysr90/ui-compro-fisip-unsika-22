export default function Hero() {
    return (
        <div className="hero min-h-screen bg-white">
            <div className="hero-content text-center w-full">
                <div className=" flex flex-col items-center -mt-20 md:mt-0">
                    <img src="/assets/logo_kabinet.png" className="h-60"></img>
                    <div className="relative h-auto ">
                        <div className="text-primary text-5xl md:text-8xl font-heading leading-tight absolute top-0 left-2 md:top-0 md:left-0">
                            WELCOME TO FISIP
                        </div>
                        <div className="text-secondary text-5xl md:text-8xl font-heading leading-tight">
                            WELCOME TO FISIP
                        </div>
                    </div>
                    <p className="py-6 text-neutral font-para text-center max-w-2xl">SI FISIP atau Sistem Informasi FISIP adalah platform yang menyediakan berbagai informasi, berita dan kegiatan yang berkaitan dengan hal akademis atau non akademis di lingkup Fakultas Ilmu Sosial dan Ilmu Politik.
Dikelola oleh Bidang Komunikasi dan Informasi BEM FISIP UNSIKA. </p>
                </div>
            </div>
        </div>
    )
}