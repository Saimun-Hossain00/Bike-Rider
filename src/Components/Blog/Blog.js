import React from 'react';
import logo from '../../images/Facebook.png';
import logo1 from '../../images/Twitter.png';
import logo2 from '../../images/YouTube.png';
import './Blog.css'

const Blog = () => {
    return (
        <div className="text-center bg-dark text-light container-xxl details">
            <h1>BIKE　ＲＩＤＥＲ</h1>
            <p className="mt-2 letter">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum provident minima laborum sunt vitae atque adipisci labore dicta ipsam iste. Repellendus sint blanditiis, dolorum dicta perferendis optio quaerat inventore. Ipsa!
            Magni, ipsam illum corporis soluta officiis, eos nobis esse ea quis laudantium corrupti culpa vero minima excepturi accusamus mollitia, libero quae. Odit atque ipsum, maxime sed error assumenda aut. A.
            Sint vitae soluta deserunt incidunt odio quas blanditiis tenetur dolores expedita odit reprehenderit, esse, mollitia ex rem vero distinctio eligendi id magnam, maxime veritatis? Adipisci dolores obcaecati quod quia laborum.
            Explicabo expedita dicta eaque ab natus dolorum est cupiditate excepturi aliquid harum iusto, nisi distinctio facere quos et consequatur perferendis quidem quaerat quia sapiente sit suscipit. Laudantium exercitationem cumque recusandae.
            Cum quam cupiditate molestiae tenetur ea fugit error! Enim rerum, tenetur, eveniet, maxime officia iusto natus sint modi placeat corrupti voluptatum dolores aspernatur. Cum ex distinctio perferendis cumque reprehenderit iste.
            Cum dicta odit sapiente voluptatibus porro ipsa ea maxime natus laboriosam neque nesciunt, quibusdam dolores asperiores voluptates voluptatem? Sequi omnis nam quisquam minima suscipit sapiente quaerat. Doloribus quasi id maxime!
            Accusantium voluptatum cupiditate consequatur error consequuntur. Laborum quae mollitia aliquam sequi temporibus iusto aperiam architecto minima eius dignissimos? Reiciendis eveniet vitae hic eligendi voluptates? Temporibus deleniti iure earum. Id, vel?
            Reprehenderit id sunt, iste expedita natus quisquam porro voluptatem ut tempore eaque! Officia nulla, possimus voluptates iste dolorum libero fugiat animi nobis illum minus, doloribus deleniti rerum odit saepe repudiandae.
           </p>
            <footer className="footer mt-5 pt-5 bg-dark">
            <img src={logo} alt=""/>
            <img src={logo1} alt=""/>
            <img src={logo2} alt=""/>
            <p>All rights reserved by Q.R</p>
            </footer>
        </div>
    );
};

export default Blog;