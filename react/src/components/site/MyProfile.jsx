import Footer from "../Footer";
import Navbar from "../Navbar";

function MyProfile() {
    return (
        <>
            <Navbar />

            <div className="row justify-content-center p-4">
                <div className="col-md-11">
                    <div className="row justify-content-center">
                        <div className="col-md-4">
                            <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" alt="" className="img-fluid" rounded />
                        </div>
                        <div className="col-md-8"></div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default MyProfile;
