function Home() {
  return (
    <section id="home">
      <div className="home-text">
        <h1>Welcome to the Home Page</h1>
        <p>Hi, I'm Moiz. I'm a Computer Science student passionate about building interactive, scalable web experiences. 
          From crafting javascript applications to developing custom 2D browser games like <em><strong>Precision Shot</strong></em> & <em><strong>Lucky Shot</strong></em>, 
          I love bringing ideas to life through code.
        </p>
        <p style={{ fontSize: '1.1rem', color: '#555' }}>
          Feel free to navigate around using the links above to see React client-side routing in action!
      </p>
      </div>
      <div className="home-image">
        <img src="vite.svg" alt="vite logo"/>
      </div>
    </section>
  );
}

export default Home;