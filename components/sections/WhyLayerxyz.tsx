"use client";
import { motion } from "framer-motion";
import { Target, Package, Sparkles } from "lucide-react";

export default function WhyLayerxyz() {
  const features = [
    {
      icon: <Target className="w-8 h-8 text-[#181818] mb-6" strokeWidth={1.5} />,
      title: "Precision Made",
      description: "Every object is printed at ultra-fine resolution with sub-millimeter accuracy."
    },
    {
      icon: <Package className="w-8 h-8 text-[#181818] mb-6" strokeWidth={1.5} />,
      title: "Made to Order",
      description: "Each piece is produced individually. No mass production. No compromise."
    },
    {
      icon: <Sparkles className="w-8 h-8 text-[#181818] mb-6" strokeWidth={1.5} />,
      title: "Expert Finishing",
      description: "Hand-finished by our studio team. Sanded, primed, and sealed to perfection."
    }
  ];

  return (
    <section className="py-24 px-6 bg-[#F5F3EE]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#181818]">THE LAYERXYZ DIFFERENCE</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] as const }}
              className="bg-white rounded-3xl p-10 border border-[#E8E5DE] shadow-sm hover:shadow-md transition-shadow"
            >
              {feature.icon}
              <h3 className="text-xl font-medium text-[#181818] mb-4">{feature.title}</h3>
              <p className="text-[#777777] leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}