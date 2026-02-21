"use client";
import React from "react";
import { motion } from "framer-motion";
import FooterCard from "../Cards/FooterCard";
import Link from "next/link";
import { ChatServiceIconSvg, FileIconSvg, RocketIconSvg } from "../SvgIcons";
import useToken from "../hooks/useToken";
import { signOut } from "@utils/lib";
import { CompanyName, filterCustomersByEmail } from "@constants";
import { useCustomer } from "../lib/woocommerce";
import { LogoImage } from "@utils/function";
import { usePathname } from "next/navigation";
import {
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoTiktok,
  BiLogoWhatsapp,
  BiLogoYoutube,
} from "react-icons/bi";

interface footerDataProps {
  title: string;
  links: {
    label: string;
    href: string;
    function?: () => void;
  }[];
}

const Footer = () => {
  const { email } = useToken();
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const { data: customer, isLoading, isError } = useCustomer("");
  const wc_customer2_info: Woo_Customer_Type[] = customer;
  const wc_customer_info: Woo_Customer_Type | undefined =
    filterCustomersByEmail(wc_customer2_info, email);
  const firstName = wc_customer_info?.first_name;
  const footer1socialMediaIcons = [
    {
      id: 1,
      icon: <BiLogoTiktok className="text-2xl sm:text-3xl text-white" />,
      link: "",
      backgroundColor: "bg-gray-900",
    },
    {
      id: 2,
      icon: <BiLogoWhatsapp className="text-2xl sm:text-3xl text-white" />,
      link: "",
      backgroundColor: "bg-whatsapp",
    },
    // {
    // 	id: 2,
    // 	icon: <Iconbi.BiLogoTwitter className='text-lg sm:text-2xl text-white' />,
    // 	link: "#",
    // 	backgroundColor: "bg-[#3CF]",
    // },
  ];

  const footerCardData = [
    {
      icon: <RocketIconSvg />,
      name: "Delivery Assistance",
      description: "Seller Online Delivery",
    },
    {
      icon: <FileIconSvg />,
      name: "Secure Purchase",
      description: "100% Secure Payment",
    },
    {
      icon: <ChatServiceIconSvg />,
      name: "Unmatched Service",
      description: "Dedicated Support",
    },
  ];

  const footerData: footerDataProps[] = [
    {
      title: "Account",
      links: [
        {
          label: firstName ? "Update Account" : "Create Account",
          href: firstName ? "/user/account-details" : "/user/register",
        },
        {
          label: firstName ? "Log Out" : "Login",
          href: firstName ? "" : "/user/login",
          function: firstName ? signOut : () => {},
        },
        {
          label: firstName ? "Change Password" : "Forget Password",
          href: firstName ? "/user/change-password" : "/user/forget-password",
        },
      ],
    },
    {
      title: "Information",
      links: [
        { label: "FAQ", href: "/faq" },
        { label: "Support", href: "/contact-us" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Terms of Use", href: "/terms-of-use?terms-of-use" },
        { label: "Privacy Policy", href: "/terms-of-use?privacy-policy" },
        { label: "Delivery & Shipping", href: "/terms-of-use?delivery-return" },
        { label: "Refund Policy", href: "/terms-of-use?refund-policy" },
      ],
    },
  ];

  const productCards = footerCardData.map((item, index) => (
    <FooterCard
      key={index}
      icon={item.icon}
      name={item.name}
      description={item.description}
      borderRight={index !== footerCardData.length - 1}
    />
  ));

  const staggerDelay = 0.2;

  const socialIcons = [
    { id: 1, icon: <BiLogoInstagram className="text-xl" />, link: "#" },
    { id: 2, icon: <BiLogoFacebook className="text-xl" />, link: "#" },
    { id: 3, icon: <BiLogoYoutube className="text-xl" />, link: "#" },
  ];

  return (
    <footer className="bg-white w-full pt-16 pb-8 border-t border-gray-100">
      <div className="mx-auto max-w-[1256px] px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Column 1: Identity */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <LogoImage className="!w-8 h-8 rounded-full" />
              <span className="text-xl font-black uppercase tracking-tighter text-black">
                Logo
              </span>
            </div>
            <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
              Vestibulum non est nisl. Donec eget sodales nisl. Donec ut velit
              erat.
            </p>
            <div className="mt-4 text-gray-400 text-xs">
              © {currentYear} All rights reserved.
            </div>
          </div>

          {/* Column 2: Explore */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <h4 className="text-gray-400 text-xs font-bold uppercase tracking-widest">
              Explore
            </h4>
            <div className="flex flex-col gap-4">
              {[...footerData[0].links, ...footerData[1].links].map(
                (link, idx) => (
                  <Link
                    key={idx}
                    href={link.href}
                    onClick={link.function}
                    className="text-gray-600 text-sm hover:text-black transition-colors">
                    {link.label}
                  </Link>
                ),
              )}
            </div>
          </div>

          {/* Column 3: Legal & Social */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <h4 className="text-gray-400 text-xs font-bold uppercase tracking-widest invisible hidden">
                Legal
              </h4>
              <div className="flex flex-col gap-4">
                {footerData[2].links.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.href}
                    className="text-gray-600 text-sm hover:text-black transition-colors">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <h4 className="text-black text-xs font-black tracking-tight">
                Social Media
              </h4>
              <div className="flex gap-2">
                {socialIcons.map((item) => (
                  <Link
                    key={item.id}
                    href={item.link}
                    className="size-9 flex items-center justify-center bg-gray-100 rounded-lg text-gray-600 hover:bg-black hover:text-white transition-all transform hover:-translate-y-1">
                    {item.icon}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
