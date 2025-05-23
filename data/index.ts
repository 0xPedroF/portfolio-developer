export const navItems = [
  { name: "About", link: "#about", translationKey: "about" },
  { name: "Projects", link: "#projects", translationKey: "projects" },
  { name: "Clients", link: "#clientProjects", translationKey: "clients" },
  { name: "Experience", link: "#experience", translationKey: "experience" },
  { name: "Contact", link: "#contact", translationKey: "contact" },
];

export const gridItems = [
  {
    id: 1,
    title: "I prioritize client collaboration, fostering open communication ",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/b1.svg",
    spareImg: "",
  },
  {
    id: 2,
    title: "I'm very flexible with time zone communications",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "My tech stack",
    description: "I constantly try to improve",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "Tech enthusiast with a passion for development.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "/b4.svg",
  },

  {
    id: 5,
    title: "Currently building a JS Animation library",
    description: "The Inside Scoop",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.svg",
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    title: "Do you want to start a project together?",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
];

export const projects = [
  {
    id: 1,
    title: "SailorMooners (SPA) - Hackathon ",
    des: "A single-page application inspired by Sailor Moon, developed in 24 hours during a hackathon. Built with jQuery.",
    img: "/scs-sailormooners.svg",
    iconLists: ["/HTML5.svg", "/js.svg", "/CSS3.svg"],
    link: "https://sailormooners.pedrofdev.com/",
  },
  {
    id: 2,
    title: "Animated Apple Iphone 3D Website",
    des: "Recreated the Apple iPhone 15 Pro website, combining GSAP animations and Three.js 3D effects..",
    img: "/p4.svg",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/three.svg", "/gsap.svg"],
    link: "https://iphone-clone.xyz/",
  },
  {
    id: 3,
    title: "Fetch API - Pokemon Theme",
    des: "API-powered project. It fetches and displays Pokémon data dynamically, offering a interface to browse your Pokémon.",
    img: "/scs-fetchAPIpokemon.svg",
    iconLists: ["/HTML5.svg", "/js.svg", "/CSS3.svg"],
    link: "https://pokeapi.pedrofdev.com/",
  },
];

/*
{
    id: 1,
    title: "3D Solar System Planets to Explore",
    des: "Explore the wonders of our solar system with this captivating 3D simulation of the planets using Three.js.",
    img: "/p1.svg",
    iconLists: ["/re.svg", "/tail.svg", "/ts.svg", "/three.svg", "/fm.svg"],
    link: "/ui.earth.com",
  },
{
    id: 2,
    title: "Yoom - Video Conferencing App",
    des: "Simplify your video conferencing experience with Yoom. Seamlessly connect with colleagues and friends.",
    img: "/p2.svg",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/stream.svg", "/c.svg"],
    link: "/ui.yoom.com",
  },
  {
    id: 3,
    title: "AI Image SaaS - Canva Application",
    des: "A REAL Software-as-a-Service app with AI features and a payments and credits system using the latest tech stack.",
    img: "/p3.svg",
    iconLists: ["/re.svg", "/tail.svg", "/ts.svg", "/three.svg", "/c.svg"],
    link: "/ui.aiimg.com",
  },*/

export const clientProjects = [
  {
    id: 1,
    title: "PJ Ferreira",
    des: "A modern website for PJ Ferreira, specializing in aluminium and PVC products.",
    img: "/scs-pj.svg",
    iconLists: ["/HTML5.svg", "/js.svg", "/CSS3.svg", "/hostinger.svg"],
    link: "https://pjferreira.pt/",
  },
  {
    id: 2,
    title: "Nails by Johanna",
    des: "A professional website for a nail salon showcasing services, professional work, and appointment booking functionality.",
    img: "/scs-nailsbyjohanna.jpg",
    iconLists: ["/re.svg", "/js.svg", "/tail.svg", "/vite.svg"],
    link: "https://nailsbyjohanna.pedrofdev.com/",
  },
  {
    id: 3,
    title: "Totogram",
    des: "Transform everyday photos into breathtaking Ghibli-inspired masterpieces with AI magic. Create stunning artwork that captures emotions.",
    img: "/scs-totogram.png",
    iconLists: ["/re.svg", "/vite.svg", "/tail.svg", "/node-js.svg", "/mongodb.svg", "/firebase.svg"],
    link: "https://totogram.io/",
  },
];

export const testimonials = [
  {
    quote:
      "Collaborating with Pedro was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Pedro's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Pedro is the ideal partner.",
    name: "Michael Johnson",
    title: "Director of AlphaStream Technologies",
  },
  {
    quote:
    "Collaborating with Pedro was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Pedro's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Pedro is the ideal partner.",
    name: "Michael Johnson",
    title: "Director of AlphaStream Technologies",
  },
  {
    quote:
      "Collaborating with Pedro was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Pedro's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Pedro is the ideal partner.",
    name: "Michael Johnson",
    title: "Director of AlphaStream Technologies",
  },
  {
    quote:
      "Collaborating with Pedro was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Pedro's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Pedro is the ideal partner.",
    name: "Michael Johnson",
    title: "Director of AlphaStream Technologies",
  },
  {
    quote:
      "Collaborating with Pedro was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Pedro's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Pedro is the ideal partner.",
    name: "Michael Johnson",
    title: "Director of AlphaStream Technologies",
  },
];

export const companies = [
  {
    id: 1,
    name: "cloudinary",
    img: "/cloud.svg",
    nameImg: "/cloudName.svg",
  },
  {
    id: 2,
    name: "appwrite",
    img: "/app.svg",
    nameImg: "/appName.svg",
  },
  {
    id: 3,
    name: "HOSTINGER",
    img: "/host.svg",
    nameImg: "/hostName.svg",
  },
  {
    id: 4,
    name: "stream",
    img: "/s.svg",
    nameImg: "/streamName.svg",
  },
  {
    id: 5,
    name: "docker.",
    img: "/dock.svg",
    nameImg: "/dockerName.svg",
  },
];

export const workExperience = [
  {
    id: 1,
    title: "Frontend Engineer",
    desc: "Assisted in the development of a web-based platform using React.js, enhancing interactivity.",
    className: "md:col-span-2",
    thumbnail: "/exp1.svg",
  },
  {
    id: 2,
    title: "Web Performance Specialist",
    desc: "Optimized website performance by reducing load times by 50%. Ensured SEO best practices and enhanced overall user experience.",
    className: "md:col-span-2",
    thumbnail: "/exp2.svg",
  },
  {
    id: 3,
    title: "Freelance App Dev Project",
    desc: "Led the dev of a mobile app for a client, from initial concept to deployment on app stores.",
    className: "md:col-span-2", // change to md:col-span-2
    thumbnail: "/exp3.svg",
  },
  {
    id: 4,
    title: "Lead Frontend Developer",
    desc: "Developed and maintained user-facing features using modern frontend technologies.",
    className: "md:col-span-2",
    thumbnail: "/exp4.svg",
  },
];

export const socialMedia = [
  {
    id: 1,
    img: "/git.svg",
    link: "https://github.com/0xPedroF",
  },
  {
    id: 2,
    img: "/link.svg",
    link: "https://www.linkedin.com/in/ppedroferreira/",
  },
  {
    id: 3,
    img: "/cvFile.svg",
    link: "/docs/CV-Resume-Pedro-Ferreira.pdf",
    download: true,
    label: "Download Resume"
  },
];