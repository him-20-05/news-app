/* eslint-disable no-useless-constructor */
import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };

    document.title = `${this.capitalizeFirstLetter(this.props.category)} News`;
  }

  async updateNews() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8ede214f46b54220aca85f2f5fb780c8&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json(data);
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }
  async componentDidMount() {
    // this method will run after render Method
    this.updateNews();

    //This line of code is inside the componentDidMount lifecycle method. Here, setState is a method provided by React's Component class to update the component's state. In this case, it updates the articles state of the component with the data fetched from the API.
  }
  //............using Promise...............
  // componentDidMount() {
  //   let url = "https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=8ede214f46b54220aca85f2f5fb780c8";
  //   fetch(url)
  //     .then(response => response.json())
  //     .then(parsedData => {
  //       console.log(parsedData);
  //       this.setState({ articles: parsedData.articles });
  //     })
  //     .catch(error => console.error('Error fetching data: ', error));
  // }

  // handlePrevious = async () => {
  //   console.log("previous");
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8ede214f46b54220aca85f2f5fb780c8&page=${
  //     this.state.page - 1
  //   }&pageSize=${this.props.pageSize}`;
  //   this.setState({loading:true})
  //   let data = await fetch(url);
  //   let parsedData = await data.json(data);
  //   console.log(parsedData);
  //   this.setState({
  //     page: this.state.page - 1,
  //     articles: parsedData.articles,
  //     loading: false
  //   });
  // };
  // handleNext = async () => {
  //   console.log("next");
  //   if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {
  //   } else {
  //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8ede214f46b54220aca85f2f5fb780c8&page=${
  //       this.state.page + 1
  //     }&pageSize=${this.props.pageSize}`;
  //     this.setState({loading:true})
  //     let data = await fetch(url);
  //     let parsedData = await data.json(data);
  //     console.log(parsedData);
  //     this.setState({
  //       page: this.state.page + 1,
  //       articles: parsedData.articles,
  //       loading: false
  //     });
  //   }
  // };

  fetchMoreData = async () => {
    const nextPage = this.state.page + 1; // Increment page number
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8ede214f46b54220aca85f2f5fb780c8&page=${nextPage}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json(data);
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      page: nextPage, // Update page number in the state
      loading: false
    });
  };
  
  

  render() {
    const { articles} = this.state;
  
    if (!articles) {
      return <Spinner />;
    }
    return (
      <>
        <h1 className="text-center">
          Top News Headlines from{" "}
          {this.capitalizeFirstLetter(this.props.category)}
        </h1>
        {/* {this.state.loading && <Spinner></Spinner>} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner></Spinner>}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    {/* <NewsItem title={element.title? element.title.slice(0,45): ""} description={element.description? element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url}/> */}

                    <NewsItem
                      title={element.title}
                      description={element.description}
                      imageUrl={
                        element.urlToImage
                          ? element.urlToImage
                          : "https://www.financialexpress.com/wp-content/uploads/2024/03/BHEL.jpg?w=1024"
                      }
                      newsUrl={element.url}
                      author={element.author ? element.author : "Unknown"}
                      date={element.publishedAt}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            type="button"
            disabled={this.state.page <= 1}
            className="btn btn-dark"
            onClick={this.handlePrevious}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handleNext}
            disabled={
              this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)
            }
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  }
}

export default News;
