import Footer from "@/components/footer";
import Navigation from "@/components/navigation";
export default function HomeLayout({ children }) {
    return (
        <>
            <Navigation />
            <div>{children}</div>
            <Footer />
        </>
    );
}