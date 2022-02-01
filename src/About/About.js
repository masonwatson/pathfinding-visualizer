import "./About.css";

export default function About() {
  return (
    <div className="about-section-bg vh-100 d-flex justify-content-center align-items-center">
      <div className="about-container container-md">
        <div className="row about-section">
          <div className=" col-12 col-md-5 col-lg-0">
            <div className="about-project paragraph">
              <h2 className="about-title">About.</h2>
              <h4 className="about-text">
                This project finds the shortest possible path between two nodes.
              </h4>
            </div>
          </div>
          <div className="col-12 col-md-7 col-lg-7 offset-md-6">
            <div className="about-use paragraph">
              <h2 className="about-subtitle">How to Use.</h2>
              <h4 className="about-text">
                Click within the grid area to create walls. Walls are insurpassable, meaning the algorithm will have to find a way around them. You can run the algorithm by clicking the "Visulize Dijkstra" button.
              </h4>
              <br/>
              <br/>
              <br/>
              <h2 className="about-subtitle">Technologies Used.</h2>
              <h4 className="about-text">
                This project utilizes Dijkstra's Algorithm and a min-heap data
                structure. It  was built with JavaScript, HTML, and CSS, in tandem with the React library and the Bootstrap framework.
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
