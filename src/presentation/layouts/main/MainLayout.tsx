import Background from "@/presentation/renderutils/background/Background";
import Menu from "../sections/main/Menu";


const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Background>
                <main>
                    {children}
                </main>
                <Menu/>
            </Background>
        </>
    );
};

export default MainLayout;
