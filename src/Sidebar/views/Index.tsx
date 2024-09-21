import { Link, NavLink } from "react-router-dom";

function Index() {
    return (
        <section className="bg-black h-full w-full">
            <section className="flex flex-col gap-12 text-white px-4 py-4 sticky top-0 z-50">
                <section>
                    <Link to={'/'} className="text-xl">
                        Clear Speak
                    </Link>
                </section>
                <nav className="text-lg flex flex-col gap-6">
                    <NavLink 
                        to={'/events'} 
                        className={({ isActive }) => 
                            isActive ? 
                            'px-2 py-1 border rounded-full text-black bg-white' : 
                            'text-white hover:bg-white hover:text-black px-3 py-1 border rounded-full'
                        }>
                        Events
                    </NavLink>
                </nav>
            </section>
            <section className="h-full overflow-auto">
                {/* Other content goes here, this will scroll */}
            </section>
        </section>
    );
}

export default Index;
