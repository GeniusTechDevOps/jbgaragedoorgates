import { useState } from "react";
import type { RootObject } from "../../interfaces/dbData";
import { motion, type Variants, AnimatePresence } from "framer-motion";

interface BusinessCardProps {
    data: RootObject;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ data }) => {

    const [isFlipped, setIsFlipped] = useState(false);
    const [sendInput, setSendInput] = useState("");
    const [active, setActive] = useState(false);

    const handleImageFlip = () => {
        setIsFlipped((prev) => !prev);
    };

    const sendWhatsapp = () => {
        const relmsg = sendInput.replace(/ /g, "%20");
        const phone = data.dataGeneral.phones[0].number
            .replace("-", "")
            .replace("-", "");

        window.open(`https://wa.me/1${phone}?text=` + relmsg, "_blank");
        setSendInput("");
        setActive(false);
    };
    return (
        <section className="w-full h-auto py-10">
            <div className="relative bottom-0 left-0 right-0 flex justify-center items-center p-2">

                {/* <motion.button
                    className=" bg-secondary rounded-2xl transition duration-300 ease-in-out transform hover:scale-105 p-3 text-black font-bold"
                    onClick={() => handleImageFlip()}
                    whileHover={{ scale: 1.05 }}
                    title="ver imagen"
                >
                    {isFlipped ? "Front" : "Back"}

                </motion.button> */}
            </div>
            <div>
                {
                    isFlipped ? (
                        <motion.div
                            className="w-full md:w-2/5 h-auto  md:h-[360px] border mx-auto relative overflow-hidden rounded-lg flex flex-col md:flex-row justify-center items-center py-5 pl-3 bg-white"
                            initial={{ opacity: 0, rotateY: isFlipped ? 180 : 0, scaleX: isFlipped ? 1 : -1 }}
                            animate={{ opacity: 1, rotateY: isFlipped ? 0 : 180 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className=" w-[220px] md:w-[280px] h-[220px] md:h-[280px] rounded-2xl absolute -right-48 md:-right-40 -top-10 md:top-0 rotate-45 bg-gradient-to-r from-primary to-tertiary z-10"></div>
                            <div className=" w-[220px] md:w-[280px] h-[220px] md:h-[280px] rounded-2xl absolute  -right-40 top-20 rotate-45 bg-gradient-to-r from-transparent to-primary"></div>
                            <div className=" w-[220px] md:w-[280px] h-[220px] md:h-[280px] rounded-2xl absolute -left-48 md:-left-40 rotate-45 bg-gradient-to-l from-primary to-tertiary z-10"></div>
                            <div className=" w-[220px] md:w-[280px] h-[220px] md:h-[280px] rounded-2xl absolute  -left-40 rotate-45 -top-5 bg-gradient-to-l from-transparent to-tertiary"></div>
                            <div className="w-3/4 md:w-3/5 -scale-x-100 relative flex flex-col justify-center items-center gap-1 z-10">
                                <img src={data.logos.primary} alt="logo" className="object-contain w-full md:w-3/5 h-full" />
                                
                                <div className="w-full h-auto flex flex-row flex-wrap justify-start md:justify-center items-start md:items-center">
                                    {
                                        data.services.slice(0, 6).map((service, index) => (
                                            <a href={`tel:+1${data.dataGeneral.phones[0].number}`} className=" flex justify-start md:justify-center items-center gap-2 mb-1 text-primary ml-4 hover:scale-105 transition-all duration-300 hover:text-primary" key={index}>
                                                <i className={`fa-solid fa-chevron-right text-base`}></i>
                                                <p key={index} className="text-base font-semibold text-end px-2">
                                                    {service.title}
                                                </p>
                                            </a>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="w-11/12 md:w-3/5 h-[60px] -scale-x-100 bg-gradient-to-l from-primary to-tertiary skew-x-[24deg] -mb-10 rounded-xl flex justify-start md:justify-start items-start pt-2 md:pt-6 z-10 pl-8 md:pl-0 relative md:absolute left-0 md:-left-32 top-0 md:-top-5">
                                {
                                    data.redesSociales.map((red, index) => (
                                        <a href={red.link} target="_blank" rel="noopener noreferrer" key={index}>
                                            <i className={`fa-brands fa-${red.icon} text-lg text-black hover:text-slate-50 hover:scale-110 transition-all duration-300 skew-x-[24deg] ml-3 md:ml-4`}></i>
                                        </a>
                                    ))
                                }
                            </div>
                            {/* <div className="w-3/5 p-1 bg-white rounded-3xl text-base text-primary -scale-x-100 text-center">
                                    <button onClick={() => sendWhatsapp()}>

                                        <span className="text-base font-semibold"><i className="fa-brands fa-whatsapp text-lg"></i> WhatsApp</span>
                                    </button>
                                </div> */}
                        </motion.div>
                    )
                        : (
                            <motion.div
                                className="w-full md:w-2/5 h-auto md:h-[360px] border mx-auto bg-white relative overflow-hidden rounded-lg flex flex-col md:flex-row justify-start items-center py-5 pl-3 gap-5 md:gap-0"
                                initial={{ opacity: 0, rotateY: isFlipped ? 180 : 0, scaleX: isFlipped ? 1 : -1 }}
                                animate={{ opacity: 1, rotateY: isFlipped ? 0 : 180 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="w-[180px] h-[180px] rounded-2xl absolute -top-28 left-0 rotate-45 bg-gradient-to-r from-primary to-secondary"></div>
                                <div className="w-[220px] md:w-[180px] h-[220px] md:h-[180px] rounded-2xl absolute -top-32 md:-top-24 left-36 md:left-20 rotate-45 bg-gradient-to-r from-secondary to-tertiary"></div>
                                <div className="w-11/12 md:w-4/5 h-[60px] -right-16 -bottom-5 bg-gradient-to-l from-primary to-tertiary -skew-x-[24deg] absolute  rounded-xl flex justify-start md:justify-center items-start pt-2 z-10 pl-8 md:pl-0">
                                    {
                                        data.redesSociales.map((red, index) => (
                                            <a href={red.link} target="_blank" rel="noopener noreferrer" key={index}>
                                                <i className={`fa-brands fa-${red.icon} text-lg text-black hover:text-slate-50 hover:scale-110 transition-all duration-300 skew-x-[24deg] ml-3 md:ml-4`}></i>
                                            </a>
                                        ))
                                    }
                                </div>
                                <div className="w-[120px] h-[120px] rounded-2xl absolute -bottom-16 left-0 md:left-36 rotate-45 bg-gradient-to-r from-secondary to-tertiary z-20 "></div>
                                <div className="w-[120px] h-[120px] rounded-2xl absolute -bottom-20 md:-bottom-20 left-10 md:left-24 rotate-45 bg-gradient-to-b from-transparent to-tertiary "></div>

                                <div className="w-full md:w-2/5 h-[200px] flex flex-col justify-center items-center pt-6 relative">
                                    <img src={data.logos.primary} alt="logo" className="object-contain w-11/12 h-full" />

                                </div>
                                <div className="w-full md:w-3/5 h-full flex flex-col px-3 justify-center items-start relative pb-20 md:pb-0 pt-0 md:pt-0">
                                    <h1 className="text-2xl md:text-2xl font-black bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent capitalize ">{data.name}</h1>
                                    {/* {
                                        data.dataGeneral.location.slice(0,1).map((location, index) => ( */}
                                    <div className=" flex justify-center items-center gap-1 text-primary mb-1 ml-4 hover:scale-105 transition-all duration-300 hover:text-primary text-start">
                                        <i className={`fa-solid fa-location-dot text-base`}></i>
                                        <p className="text-base font-semibold px-2 py-1">
                                            {
                                                data.accountAddress
                                            }
                                        </p>
                                    </div>
                                    {/* ))
                                    } */}

                                    <div className=" flex justify-start items-center px-4 text-primary">
                                        <i className={`fa-solid fa-phone text-base mr-2`}></i>
                                        <div className="flex justify-start items-center">
                                            {
                                                data.dataGeneral.phones.slice(0, 2).map((phone, index) =>
                                                (
                                                    <a href={`tel:+1${phone.number}`} key={index}>
                                                        <p key={index} className="text-base font-semibold text-end mr-2 py-1 text-primary hover:scale-105 transition-all duration-300 hover:text-primary">
                                                            {/* {phone.number} */}
                                                            {phone.number}{index === 0 ? " |" : ""}
                                                        </p>
                                                    </a>
                                                ))
                                            }
                                        </div>
                                    </div>

                                    {
                                        data.dataGeneral.emails.slice(0, 2).map((email, index) => (
                                            <a href={`mailto:${email}`} className=" flex justify-center items-center gap-1 text-primary mb-1 ml-4 hover:scale-105 transition-all duration-300 hover:text-primary" key={index}>
                                                <i className={`fa-solid fa-envelope text-base`}></i>
                                                <p key={index} className="text-base font-semibold text-end px-2 py-1">
                                                    {email.email}
                                                </p>
                                            </a>
                                        ))
                                    }
                                    <div className=" flex justify-start items-center px-3 text-primary">
                                        <i className={`fa-solid fa-globe text-lg mr-2`}></i>
                                        <a href="/" target="_blank" rel="noopener noreferrer" className="text-base font-semibold text-end py-1 text-primary hover:scale-105 transition-all duration-300 hover:text-primary">
                                            {data.domain}
                                        </a>
                                    </div>
                                    <div className="w-2/4 p-1 bg-primary rounded-3xl text-base text-white text-center mt-2">
                                    <button onClick={() => sendWhatsapp()}>

                                        <span className="text-base font-semibold"><i className="fa-brands fa-whatsapp text-lg"></i> WhatsApp</span>
                                    </button>
                                </div>
                                    


                                </div>

                            </motion.div>
                        )
                }
            </div>
        </section>
    );
}

export default BusinessCard;