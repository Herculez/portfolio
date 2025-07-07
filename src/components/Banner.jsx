import { ArrowRightCircle } from "react-bootstrap-icons";

export const Banner = ({ children }) => {
    return (
        <section className="banner" id="banner">
            {/* Background Canvas */}
            {children}

            {/* Foreground content */}
            <div className="banner-content">
                <div className="font-face-cl">
                    <h1>{`Hello, I'm Dion Marks `}</h1>
                    <h2>Software, FullStack and Game Developer</h2>

                </div>
            </div>
        </section>
    );
};