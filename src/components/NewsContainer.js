import React, { Component } from 'react'
import Card from './Card'

export class NewsContainer extends Component {

  // Here we are storing all the object arrays in article variable 
  // In class component we don't require to use let or const to declare a variable

     localArticle = [
      {
        "source": {
          "id": null,
          "name": "The Indian Express"
        },
        "author": "Sports Desk",
        "title": "IND vs SA 3rd T20 Live Score Updates: Shreyas Iyer departs, India lose 2nd wicket - The Indian Express",
        "description": "IND vs SA 3rd T20 Live Cricket Score Streaming Online Today Match, Star Sports 1 Hindi, Hotstar Live: India take on South Africa in Visakhapatnam.",
        "url": "https://indianexpress.com/article/sports/cricket/india-vs-south-africa-ind-vs-sa-3rd-t20i-live-score-updates-7969302/",
        "urlToImage": "https://images.indianexpress.com/2022/06/IND-SA-3rd-T20-Live.jpg",
        "publishedAt": "2022-06-14T14:30:09Z",
        "content": "IND vs SA 3rd T20 Live Cricket Score Streaming Online Today Match Updates:\r\n IND vs SA 3rd T20 Live Cricket Score Streaming Online Today.\r\nIND vs SA: Shreyas Iyer explains why India held Dinesh Karth… [+943 chars]"
      },
      {
        "source": {
          "id": null,
          "name": "Bollywood Life"
        },
        "author": "BollywoodLife",
        "title": "Vamika's pics leaked again: 5 times Virat Kohli and Anushka Sharma struggled to keep their daughter away from - Bollywood Life",
        "description": "Virat Kohli and Anushka Sharma have been struggling to keep their daughter Vamika away from pubic glare every time they step out, be it for work or family vacation. Take a look.",
        "url": "https://www.bollywoodlife.com/photos/vamikas-pics-leaked-again-5-times-virat-kohli-and-anushka-sharma-struggled-to-keep-their-daughter-away-from-public-glare-2101451/",
        "urlToImage": "https://st1.bollywoodlife.com/wp-content/uploads/2022/06/Vamika-6-600x315.jpg",
        "publishedAt": "2022-06-14T11:10:27Z",
        "content": "Virat Kohli and Anushka Sharma have been struggling to keep their daughter Vamika away \r\nfrom pubic glare every time they step out, be it for work or family vacation. The couple \r\nrecently returned f… [+218 chars]"
      },
      {
        "source": {
          "id": null,
          "name": "Hindustan Times"
        },
        "author": "HT Entertainment Desk",
        "title": "Sara Ali Khan makes a promise to Sushant Singh Rajput on 2nd death anniversary - Hindustan Times",
        "description": "Sara Ali Khan penned a heart-touching note on Instagram in the memory of late actor Sushant Singh Rajput, opposite whom she made her acting debut with Kedarnath.",
        "url": "https://www.hindustantimes.com/entertainment/bollywood/sara-ali-khan-makes-a-promise-to-sushant-singh-rajput-on-his-2nd-death-anniversary-101655198171540.html",
        "urlToImage": "https://images.hindustantimes.com/img/2022/06/14/1600x900/sara_sushant_1655198593391_1655199221855.jpg",
        "publishedAt": "2022-06-14T11:01:45Z",
        "content": "Sara Ali Khan has shared a sweet memory as she remembered her first co-star, late actor Sushant Sing Rajput on his death anniversary. Sharing a picture from the shoot of their film, Kedarnath, Sara w… [+1780 chars]"
      },
      {
        "source": {
          "id": null,
          "name": "The Tribune India"
        },
        "author": "The Tribune India",
        "title": "Agnipath unveiled: Government announces radical changes in Armed forces recruitment policy - The Tribune India",
        "description": "A new recruitment policy for troops in the Indian Armed forces, announced today by Defence Minister Rajnath Singh, will allow women to be inducted and change composition of certain British-era regiments of the Indian Army which have youth only from specific c…",
        "url": "https://www.tribuneindia.com/news/nation/government-announces-agnipath-recruitment-scheme-for-armed-forces-403849",
        "urlToImage": "https://englishtribuneimages.blob.core.windows.net/gallary-content/2022/6/2022_6$largeimg_152479419.jpeg",
        "publishedAt": "2022-06-14T10:34:00Z",
        "content": "Tribune News Service\r\nAjay Banerjee\r\nNew Delhi, June 14\r\nA new recruitment policy for troops in the Indian Armed forces, announced today by Defence Minister Rajnath Singh, will allow women to be indu… [+5021 chars]"
      }
    ] 
  
  render() {
    return (
      <>
        <div className="container my-3">
          <h1>Top Headlines</h1>
          <div className="row">
           {/* //! We can also use maps to iterate all the article variable object */}
            {/* //! In react we can return the "component" directly it will render the card "component" in the webpage we dont require to store it in variable like we do in javascript */}
            {this.localArticle.map(function (element) {
              
              //?---------------- Returning Card Component Here -----------------------------
              // In react if we create a duplicate element we must pass an attribute "key" to uniquely identify that element otherwise it will throw an error here we have a url,title, urlToImage which is different in each element, normally "key" used in array while we are looping thorugh it.
              // And one important thing is we can't pass "key" as a props to any component
              return <div key={element.url} className="col-md-4">
                {/* Here we have used ternary operator to prevent "slice" from "null" values it means if the element.title or element.description is have no value means null then execute the else part otherwise render the title and description with slicing */}
                <Card

                  title={element.title ? element.title.slice(0, 50) : "Nothing to show"}
                  description={element.description ? element.description.slice(0, 170) : "Nothing to show"}
                  //? here we've used ! not of operator
                  imgUrl={!element.urlToImage ? 'https://pbs.twimg.com/profile_images/1108430392267280389/ufmFwzIn_400x400.png' : element.urlToImage} newsUrl={element.url}

                />
              </div>
            })}
            {/* //?------------------------ Card Component End ----------------------------- */}
            </div>
        </div>
      </>
    )
  }
}

export default NewsContainer