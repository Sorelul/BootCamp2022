import React from 'react'
import '../CSS/Home.css'
import '../CSS/MsMadi-Regular.ttf'
import Card from '../helpers/Card'
function Home() {



    return (

        <div className={"Container_principal"}>

            <div className={"banner"}>
                <div className={"banner_continut"}>

                    Let the world know what you desire
                </div>
            </div>


            <div className={"main"}>
                <div className={"main_1"}>
                    <Card buton="Catre Login" image="https://login.gov/assets/img/login-gov-600x314.png" name="Login" ></Card>
                </div>
                <div className={"main_2"}>
                    <Card buton="Catre Inregistrare" image="https://emergingasia.org/images/register1.png" name="Register"></Card>
                </div>
                <div className={"main_3"}>
                    <Card buton="Catre Mai Multe Informatii" image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcxYOOLqYUlaedBOlvRVklXB6NTWySsOTazw&usqp=CAU" name="Info"></Card>
                </div>
            </div>

        </div>
    )


}

export default Home