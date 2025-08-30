"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";

const AboutPage = () => {
  const highlightItems = [
    {
      img: "/fast-delivery.png",
      title: "Giao hàng nhanh",
      desc: "Cam kết giao hàng đúng hẹn, nhanh chóng và an toàn.",
    },
    {
      img: "/quality-books.png",
      title: "Sách chất lượng",
      desc: "Chỉ cung cấp sách chính hãng, đảm bảo chất lượng đến tay độc giả.",
    },
    {
      img: "/support.png",
      title: "Hỗ trợ khách hàng",
      desc: "Hỗ trợ 24/7, tư vấn tận tình và giải quyết vấn đề nhanh chóng.",
    },
  ];

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]); // hero trượt nhẹ

  return (
    <div className="">
      {/* Hero Section */}
      <motion.section
        className="relative bg-[url('/hero-bg.jpg')] bg-cover bg-center flex items-center justify-center"
        style={{ y: heroY }}
      >
        <div className="bg-black/50 w-full h-full absolute top-0 left-0"></div>
        <motion.h1
          className="relative text-white text-4xl sm:text-6xl font-bold text-center px-4"
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Giới thiệu về <span className="text-primary">Toidocsach</span>
        </motion.h1>
      </motion.section>

      {/* Highlights Section */}
      <section className="max-w-[1230px]  mx-auto px-5 py-12 ">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
          Điểm nổi bật của chúng tôi
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlightItems.map((item, idx) => (
            <motion.div
              key={idx}
              className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              style={{ y: heroY }}
            >
              <Image src={item.img} alt={item.title} width={80} height={80} />
              <h3 className="text-xl font-bold mt-4">{item.title}</h3>
              <p className="text-gray-600 mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Connection Methods */}
      <section className="bg-gray-50 py-12 px-5  ">
        <div className="max-w-[1230px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
          <motion.div
            className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col items-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold mb-4">Liên hệ nhanh</h3>
            <div className="flex flex-col gap-2 text-gray-700">
              <div className="flex items-center gap-2 justify-center">
                <Phone />{" "}
                <a href="tel:+84589443320" className="hover:text-primary">
                  +84 589443320
                </a>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <Mail />{" "}
                <a
                  href="mailto:linhb2110130@student.ctu.edu.vn"
                  className="hover:text-primary"
                >
                  Email chúng tôi
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col items-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-4">Địa chỉ</h3>
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin />
              <a
                href={`https://www.google.com/maps?q=${encodeURIComponent(
                  "4/9A, Mậu Thân, Ninh Kiều, Cần Thơ"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                4/9A, Mậu Thân, Ninh Kiều, Cần Thơ
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
