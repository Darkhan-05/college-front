'use client';

import { motion } from 'motion/react';

export default function Contacts() {
    return (
        <motion.section
            id="contacts"
            className="py-12"
            initial={{opacity: 0, y: 70}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.6, delay: 0.1}}
        >
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-semibold mb-8 text-center">Контакты организаторов</h2>
                <div className="grid md:grid-cols-2 gap-6 text-gray-800">
                    <div className="border p-6 rounded-xl bg-white shadow">
                        <h3 className="text-xl font-bold mb-2">Заведующая отделением</h3>
                        <p>Ильясова Салтанат Адильжановна</p>
                        <p>📞 +12359944923</p>
                        <p>📧 <a href="mailto:ilyassova2394@gmail.com"
                                className="text-blue-600 underline">ilyassova2394@gmail.com</a></p>
                    </div>

                    <div className="border p-6 rounded-xl bg-white shadow">
                        <h3 className="text-xl font-bold mb-2">И.о. зам. директора по УР</h3>
                        <p>Даиров Жумабекович</p>
                        <p>📞 +77753337825</p>
                    </div>

                    <div className="border p-6 rounded-xl bg-white shadow">
                        <h3 className="text-xl font-bold mb-2">Руководитель УМО</h3>
                        <p>Калбековна</p>
                        <p>📞 +7771677557</p>
                        <p>📧 <a href="mailto:ksdfwmk@" className="text-blue-600 underline">ksdfwmk@</a></p>
                    </div>

                    <div className="border p-6 rounded-xl bg-white shadow">
                        <h3 className="text-xl font-bold mb-2">Методисты</h3>
                        <p>Куниова Куанышбковна – 📞 +777123123</p>
                        <p>Халитова – 📞 +77123123123</p>
                    </div>
                </div>
            </div>
        </motion.section>
    )
}
