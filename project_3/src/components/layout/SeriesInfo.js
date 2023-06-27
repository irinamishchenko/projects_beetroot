import { Link, useParams } from "react-router-dom";

function SeriesInfo(props) {
  const params = useParams();
  const id = params.id;
  const name = props.name;
  const series = props.series.items;
  const seriesItems = series.map((item) => (
    <li className="info-list-item" key={item.name}>
      <Link to={"/series/" + item.resourceURI.split("/").splice(6).join()}>
        {item.name}
      </Link>
    </li>
  ));
  return (
    <section className="info-container series-info-container">
      <h3 className="info-title">Series</h3>
      <ol className="info-list">{seriesItems}</ol>
      {props.series.available && props.series.available > 20 ? (
        <Link to={"/" + name + "/" + +id + "/series"} className="info-button">
          More
        </Link>
      ) : null}
    </section>
  );
}

export default SeriesInfo;
