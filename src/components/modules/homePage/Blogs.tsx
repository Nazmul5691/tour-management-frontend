import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

export default function Blogs() {
    const blogs = [
        {
            id: 1,
            title: "It empowers designers to swiftly create",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
            author: "Andrew",
            authorImg: "/images/client1.jpg",
            date: "27 Sep 2025",
            image: "/images/blog1.jpg",
            tag: "Booking",
        },
        {
            id: 2,
            title: "It empowers designers to swiftly create",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
            author: "Andrew",
            authorImg: "/images/client1.jpg",
            date: "27 Sep 2025",
            image: "/images/blog2.jpg",
            tag: "Booking",
        },
        {
            id: 3,
            title: "It empowers designers to swiftly create",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
            author: "Andrew",
            authorImg: "/images/client1.jpg",
            date: "27 Sep 2025",
            image: "/images/blog3.jpg",
            tag: "Booking",
        },
        {
            id: 4,
            title: "It empowers designers to swiftly create",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
            author: "Andrew",
            authorImg: "/images/client1.jpg",
            date: "27 Sep 2025",
            image: "/images/blog4.jpg",
            tag: "Booking",
        },
    ];

    return (
        <section className="relative py-20">
            {/* Amber Glow Background */}
            {/* <div
                className="absolute inset-0 -z-10"
                style={{
                    background: "radial-gradient(125% 125% at 50% 10%, rgba(255,255,255,0.8) 30%, #f59e0b 100%)",
                }}
            /> */}

            <div className="max-w-7xl mx-auto px-4">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-16 text-center md:text-left">
                    <div className="mb-4 md:mb-0">
                        <p className="text-sm font-medium text-purple-300 uppercase tracking-wide">
                            Latest Updates
                        </p>
                        <h2 className="text-3xl md:text-5xl font-extrabold mt-2 leading-tight">
                            Checkout our{" "}
                            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
                                Recent Articles
                            </span>
                        </h2>
                        <p className="text-gray-700 mt-4 max-w-2xl">
                            Explore our blog to get the latest news, travel tips, and helpful guides for your next adventure.
                        </p>
                    </div>
                    <Button className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-white hover:opacity-90 rounded-full px-6 py-3">
                        View All Blogs
                    </Button>
                </div>

                {/* Blog Layout */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Left Large Blog */}
                    <Card className="overflow-hidden p-0 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="relative">
                            <img
                                src={blogs[0].image}
                                alt={blogs[0].title}
                                className="w-full h-80 object-cover"
                            />
                            <span className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-white text-sm px-3 py-1 rounded-md font-medium">
                                {blogs[0].tag}
                            </span>
                        </div>
                        <CardContent className="px-6">
                            <h3 className="text-xl font-semibold mb-2">{blogs[0].title}</h3>
                            <p className="text-gray-600 mb-4">{blogs[0].description}</p>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                                <div className="flex items-center gap-2 pb-5">
                                    <img
                                        src={blogs[0].authorImg}
                                        alt={blogs[0].author}
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                    <span>{blogs[0].author}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>{blogs[0].date}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Right Small Blogs */}
                    <div className="flex flex-col gap-6">
                        {blogs.slice(1).map((blog) => (
                            <Card
                                key={blog.id}
                                className="flex md:flex-row overflow-hidden p-0 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="relative md:w-1/3">
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="w-full h-40 object-cover"
                                    />
                                    <span className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-white text-xs px-2 py-1 rounded-md font-medium">
                                        {blog.tag}
                                    </span>
                                </div>
                                <CardContent className="p-4 md:w-2/3 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-1">{blog.title}</h3>
                                        <p className="text-gray-600 text-sm">{blog.description}</p>
                                    </div>
                                    <div className="flex items-center justify-between text-sm text-gray-500 mt-3">
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={blog.authorImg}
                                                alt={blog.author}
                                                className="w-7 h-7 rounded-full object-cover"
                                            />
                                            <span>{blog.author}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            <span>{blog.date}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>

    );
}
