'use client';

import { motion } from 'motion/react';

export default function Contacts() {
    return (
        <motion.section
            id="contacts"
            className="py-12"
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
        >
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-semibold mb-8 text-center">Контакты организаторов</h2>

                <div className="grid md:grid-cols-2 gap-6 text-gray-800">
                    {[
                        {
                            title: 'Заведующая отделением',
                            name: 'Ильясова Салтанат Адильжановна',
                            phone: '+12359944923',
                            email: 'ilyassova2394@gmail.com'
                        },
                        {
                            title: 'И.о. зам. директора по УР',
                            name: 'Даиров Жумабекович',
                            phone: '+77753337825'
                        },
                        {
                            title: 'Руководитель УМО',
                            name: 'Калбековна',
                            phone: '+7771677557',
                            email: 'ksdfwmk@'
                        },
                        {
                            title: 'Методисты',
                            name: 'Куниова Куанышбковна – 📞 +777123123\nХалитова – 📞 +77123123123'
                        }
                    ].map((contact, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="border p-6 rounded-xl shadow hover:shadow-lg transition"
                        >
                            <h3 className="text-xl font-bold mb-2">{contact.title}</h3>
                            <p className="whitespace-pre-line">{contact.name}</p>
                            {contact.phone && <p>📞 {contact.phone}</p>}
                            {contact.email && (
                                <p>
                                    📧{' '}
                                    <a
                                        href={`mailto:${contact.email}`}
                                        className="text-blue-600 underline"
                                    >
                                        {contact.email}
                                    </a>
                                </p>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
}
