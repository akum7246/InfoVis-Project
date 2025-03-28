const unpack = (data, key) => data.map(row => row[key]);

//choropleth template code extracted from : https://plotly.com/javascript/choropleth-maps/
Plotly.d3.csv("socialmediabycountry.csv", socialMediaData => {
    // Extracting data from the first two rows
    const countries = unpack(socialMediaData, 'country');
    const socialMediaUsers = unpack(socialMediaData, 'Number of social media users in 2023');

    // to calculate the maximum value in socialMediaUsers array
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max
    const maxSocialMediaUsers = Math.max(...socialMediaUsers);

    const customColorScale = [
        [0.0, '#fddfb0'],
    [0.1, '#FCDA88'],
    [0.2, '#FEC26F'],
    [0.3, '#FCB55C'],
    [0.4, '#FCBE67'],
    [0.5, '#F5B162'],
    [0.6, '#EBA05A'],
    [0.7, '#D48C5A'],
    [0.8, '#C97D5A'],
    [0.9, '#B7725A'],
    [1.0, '#B1625A']
    ];


    var data = [{
        type: 'choropleth',
        locationmode: 'country names',
        locations: countries,
        z: socialMediaUsers,
        zmin: 0,
        zmax: maxSocialMediaUsers, // Set zmax to the maximum value to ensure that the color scale used to represent the data covered the entire range of values present in the dataset. 
        text: countries,
        colorscale: customColorScale,
        marker: {
            line: {
                color: 'rgb(150,150,150)',
                width: 0.5

            }

        },
        colorbar: {
            ticksuffix: '',
            cornerradius: 100, //not working
            title: 'Social Media<br> Users (2023)',
orientation: 'h',
            len: 0.8,
            thickness: 10, //https://plotly.com/python/reference/#heatmap-colorbar
            y: 0.5,
            
        }
    }];

    var layout = {
        paper_bgcolor: '#FFFAE9',
        width: 1000,
        height: 700,
        margin: {l: 0, r: 0 }, //center the chart 

        font: {
            size: 15,
            family: "Segoe UI, sans-serif",
            color: "Black",
        },
        
        title: '2023 Social Media Users by Country',
        geo: {
            showframe: false,
            showcoastlines: true,

            projection: {
                type: 'mercator'
            },
            showocean: true,
            oceancolor: '#FFFAE9',
            bgcolor: '#FFFAE9',
            lataxis: { range: [-10, 90] }, // Latitude range to crop
            //lataxis code extracted from: https://community.plotly.com/t/choropleth-latitude-is-slightly-off/67828

        },
        dragmode: false, // Disabled dragging
        annotations: [
            {
                x: 1.05,
                y: 0,
                xref: 'paper',
                yref: 'paper',
                showarrow: false,
                text: '<a href="https://worldpopulationreview.com/country-rankings/social-media-users-by-country">Data Source: World Population Review</a>',
                font: {
                    size: 14,
                    color: 'black'
                }
            }
        ],
    };
//chart responsivity code picked up from tutor Joel
    let config = {
        responsive: true
    }

    Plotly.newPlot("choropleth", data, layout, config);
});

//area chart code extracted from: https://plotly.com/javascript/filled-area-plots/
Plotly.d3.csv("suiciderateUSA.csv", suicideData => {
    // Extracting data from the suicideData
    const years = unpack(suicideData, 'YEAR');
    const deaths = unpack(suicideData, 'SUM of DEATHS');



    // Defined data for line chart
    var data2 = [{
        x: years,
        y: deaths,
        type: 'scatter',
        mode: 'lines+markers',
        fill: 'tozeroy',
        line: {
            color: '#F2AA00',
            width: 2
        }
    }];


    var layout2 = {
        plot_bgcolor: '#FFFAE9',
        paper_bgcolor: '#FFFAE9',
        title: 'Deaths by Suicide in USA (Yearly Trend)',
        font: {
            size: 15,
            family: "Segoe UI, sans-serif",
            color: "Black",
        },
        xaxis: {
            title: 'Years',
            ticklen: 10, // Adjusted the length of the ticks as the ticks were previously very close to the chart, making it hard to read
           //chatGpt helped in getting ticklen attribute as I could not find online resources on it
            automargin: true
            
        },
        yaxis: {
            title: 'Yearly Deaths',
            range: [40000, 55000],
            ticklen: 10,
            automargin: true
        },
         margin: {
            t: 80, 
            r: 20,
            l: 20,
            b: 100
        },
        annotations: [
            {
                x: 1,
                y: 1.21,
                xref: 'paper',
                yref: 'paper',
                showarrow: false,
                text: '<a href="https://www.cdc.gov/nchs/pressroom/sosmap/suicide-mortality/suicide.htm">Data Source: CDC</a>',
                font: {
                    size: 14,
                    color: 'black'
                }
            }
        ],
        
    };
    

    let config = {
        responsive: true
    }

    
    Plotly.newPlot("linechart", data2, layout2, config)

});


Plotly.d3.csv("socialmediaSentiment.csv", sentimentData => {
    // Extracting data from the sentimentData
    const years = unpack(sentimentData, 'Year');
    const positiveSentiment = unpack(sentimentData, 'Positive');
    const negativeSentiment = unpack(sentimentData, 'Negative');

    // Defined data for stacked area chart
    var data3 = [
        {
            x: years,
            y: positiveSentiment,
            type: 'scatter',
            mode: 'none',
            fill: 'tonexty',
            fillcolor: 'rgba(251, 226, 149, 0.8)',
        visible: 'legendonly', // Initially set to only appear in legend and not in the chart, users are able to toggle it on by clicking
        //code extracted from: https://plotly.com/python/legend/
            name: 'Positive Sentiment',
            marker: {
                color: '#FBE295',
                width: 1
                },
         
        },
        
        {
            x: years,
            y: negativeSentiment,
            type: 'scatter',
            mode: 'none',
            fill: 'tozeroy', 
            name: 'Negative Sentiment',
            fillcolor: 'rgba(225, 113, 74, 0.8)',
        
           
            marker: {
                color: '#E1714A',
                width: 1
                },
         

        }
    ];
    var layout3 = {
        plot_bgcolor: '#FFFAE9',
        paper_bgcolor: '#FFFAE9',
        title: 'Social Media Sentiment Analysis',
        font: {
            size: 15,
            family: "Segoe UI, sans-serif",
            color: "Black",
        },
        xaxis: {
            title: 'Years',
            tickmode: 'linear',
            automargin: true,
            ticklen: 10
            
          
        },
        yaxis: {
            title: 'Count of Posts',
            automargin: true,
            ticklen: 10

        },
        margin: {
            t: 80, 
            r: 20,
            l: 20,
            b: 100
        },
        legend: {
            //code extracted and manipulated from: https://stackoverflow.com/questions/66203229/is-there-a-way-to-prevent-the-legend-on-plotly-from-moving-up-into-the-chart-whe
            x: 1, // Set the x position of the legend to be on the right side of the plot
            xanchor: 'right', // Anchor the legend to the right side
            y: 1.3, // Set the y position slightly above the title
            yanchor: 'top' // Anchord the legend slightly above the title so it aligned
        },
        annotations: [
            {
                x: -0.07,
                y: 1.25,
                xref: 'paper',
                yref: 'paper',
                showarrow: false,
                text: '<a href="https://www.kaggle.com/datasets/kashishparmar02/social-media-sentiments-analysis-dataset">Data Source: Kaggle</a>',
                font: {
                    size: 14,
                    color: 'black'
                }
            }
        ],
       
       
    };
    let config = {
        responsive: true
    }
    // Plotted the stacked area chart
    Plotly.newPlot('filledAreaChart', data3, layout3, config);
});


Plotly.d3.csv("mentalhealthSubreddits.csv", subredditData => {
   
    const categories = unpack(subredditData, 'Subreddit');
    const values = unpack(subredditData, 'Active Users');


    const barColors = ['#F1B173', '#8B97D5', '#9a5b75', '#3e6f83', '#67a0c9'];
    // Defined trace for the bar chart
    var data4 = [{
        x: categories,
        y: values,
        type: 'bar',
        marker: {
            color: barColors
        }
    }];

    // Defined layout for the bar chart
    var layout4 = {
        plot_bgcolor: '#FFFAE9',
        paper_bgcolor: '#FFFAE9',
        title: 'Popular Subreddits Dedicated To Mental Health',
        font: {
            size: 15,
            family: "Segoe UI, sans-serif",
            color: "Black",
        },
        xaxis: {
            title: 'Subreddits',
            automargin: true,
            ticklen: 10
        },
        barcornerradius: 15,
        yaxis: {
            title: 'Total users',
            range: [0, 1000000],
            tickmode: 'linear',
            dtick: 250000,
            tickformat: ',d',
            automargin: true,
            ticklen: 10
        },
        margin: {
            t: 80,
            r: 20,
            l: 20,
            b: 100
        },
        annotations: [
            {
                x: 1,
                y: 1.215,
                xref: 'paper',
                yref: 'paper',
                showarrow: false,
                text: '<a href="https://www.kaggle.com/datasets/f995248f9f3ed770655c1d2f73d38bb6555ea2fcbb1055f50f5354e3c6c4100d">Data Source: Kaggle</a>',
                font: {
                    size: 14,
                    color: 'black'
                }
            }
        ],
    };
    let config = {
        responsive: true
    }
 
    Plotly.newPlot('barChart', data4, layout4, config);
});
//starter code extracted from: https://plotly.com/javascript/bar-charts/
Plotly.d3.csv("subredditSentiment.csv", sentimentData => {
   
    const categories = unpack(sentimentData, 'subreddit');
    const positiveValues = unpack(sentimentData, 'positive');
    const negativeValues = unpack(sentimentData, 'negative');

    var tracePositive = {
        x: positiveValues,
        y: categories,
        type: 'bar',
        //horizontal bar charts code: https://plotly.com/python/horizontal-bar-charts/
        orientation: 'h', // Set orientation to horizontal to make it visually interesting
        marker: {
            color: '#FBE295'
        },
        name: 'Positive Sentiment',
        width: 0.4
    };

    var traceNegative = {
        x: negativeValues,
        y: categories,
        type: 'bar',
        orientation: 'h', // Set orientation to horizontal
        marker: {
            color: 'rgba(225, 113, 74, 0.8)'
        },
        name: 'Negative Sentiment',
        width: 0.4
    };

    // Combining traces into a data array
    var data5 = [tracePositive, traceNegative];

    // Defining layout for the bar chart
    var layout5 = {
        plot_bgcolor: '#FFFAE9',
        paper_bgcolor: '#FFFAE9',
        title: 'Sentiment Analysis of Popular Mental Health Subreddits',
        font: {
            size: 15,
            family: "Segoe UI, sans-serif",
            color: "Black",
        },
        yaxis: {
            title: 'Subreddits', // Since the chart is horizontal, this axis represents subreddits
            automargin: true,
            ticklen: 10,
            automargin: true
        },
        xaxis: {
            title: 'Sum of Positive & Negative Posts',
            range: [0, 350],
            tickmode: 'linear',
            dtick: 50,
            ticklen: 10,
            automargin: true
           
          
        },
        margin: {
            t: 80, 
            r: 20,
            l: 20,
            b: 100
        },
        //plotly python chart annotations code extracted and manipulated to fit js: https://plotly.com/python/text-and-annotations/
        annotations: [
            {
                x: -0.247,
                y: 1.221,
                xref: 'paper',
                yref: 'paper',
                showarrow: false,
                text: '<a href="https://www.kaggle.com/datasets/f995248f9f3ed770655c1d2f73d38bb6555ea2fcbb1055f50f5354e3c6c4100d">Data Source: Kaggle</a>',
                font: {
                    size: 14,
                    color: 'black'
                }
            }
        ],

        //changed hovermode to improve legibility of hover text as the previous hover text was not readable by users
        //code extracted from: https://plotly.com/python/hover-text-and-formatting/
        hovermode: 'y unified',

        barmode: 'group',
        bargap: 0,
        bargroupgap: 0.8,
        legend: {
            orientation: 'v', // Placed legend on top of the plot
            x: 1,
            y: 1.15, // Adjusted the vertical position so it aligns with the chart
            xanchor: 'center',
            yanchor: 'middle'
        }

    };
    let config = {
        responsive: true
    }
    // Ploted bar chart
    Plotly.newPlot('horizontalGroupedBarChart', data5, layout5, config);
});

Plotly.d3.csv("root cause.csv", rootCauseData => {
    // Extracting data from the CSV using unpack
    const categories = unpack(rootCauseData, 'Root Cause');
    const anxietySum = unpack(rootCauseData, 'Sum of scores made on anxiety subreddit');
    const depressionSum = unpack(rootCauseData, 'Sum of scores made on depression subreddit');

    var tracePositive = {
        x: categories,
        y: anxietySum,
        type: 'bar',

        marker: {
            color: '#F1B173'
        },
        name: 'r/Anxiety',
        width: 0.4
    };

    var traceNegative = {
        x: categories,
        y: depressionSum,
        type: 'bar',

        marker: {
            color: '#8B97D5'
        },
        name: 'r/Depression',
        width: 0.4
    };

    // Combined traces into data array
    var data6 = [tracePositive, traceNegative];

    // Defined layout for the bar chart
    var layout6 = {
        plot_bgcolor: '#FFFAE9',
        paper_bgcolor: '#FFFAE9',
        title: 'Correlation Between Users Perceived Root Cause and Mental Illness',
        font: {
            size: 13.5,
            family: "Segoe UI, sans-serif",
            color: "Black",
        },
        yaxis: {
            title: 'Post Score (Upvotes - Downvotes)',
            automargin: true,
            automargin: true,
            ticklen: 10
        },
        xaxis: {
            title: 'Subreddits',
            automargin: true,
            ticklen: 10

        },
        margin: {
            t: 80, 
            r: 20,
            l: 20,
            b: 100
        },
        annotations: [
            {
                x: -0.07,
                y: 1.25,
                xref: 'paper',
                yref: 'paper',
                showarrow: false,
                text: '<a href="https://www.kaggle.com/datasets/f995248f9f3ed770655c1d2f73d38bb6555ea2fcbb1055f50f5354e3c6c4100d">Data Source: Kaggle</a>',
                font: {
                    size: 14,
                    color: 'black'
                }
            }
        ],
        legend: {
            x: 1, // Set the x position of the legend to be on the right side of the plot
            xanchor: 'right', // Anchored the legend to the right side
            y: 1.3, // Set the y position slightly above the title so it aligned with the chart
            yanchor: 'top' // Anchored the legend slightly above the title
        },
        hovermode: 'x unified',
        barmode: 'group',



    };
    let config = {
        responsive: true
    }
    // Plotted the bar chart
    Plotly.newPlot('verticalGroupedBarChart', data6, layout6, config);
});

//piechart template code extracted from: https://plotly.com/javascript/pie-charts/
Plotly.d3.csv("facebookSentiment.csv", fbData => {
    // Extracting data from the CSV using unpack
    const negativeSentiment = unpack(fbData, 'NegativePosts');
    const positiveSentiment = unpack(fbData, 'PositivePosts');

    // Defined the trace for the pie chart
    var trace = {
        values: [negativeSentiment[0], positiveSentiment[0]], // Since there's only one row in the CSV
        labels: ['% of Negative Posts', '% of Positive Posts'],
        type: 'pie',
        marker: {
            colors: ['#E1714A', '#FBE295'] // Set colors for negative and positive sentiment
        },

        hoverinfo: 'label+percent', // ONLY Showing label and percentage on hover
        textinfo: 'none', // Do not show text on the chart

    };


    var data7 = [trace];

    var layout7 = {
        plot_bgcolor: '#FFFAE9',
        paper_bgcolor: '#FFFAE9',
        title: {
            text: 'Facebook Sentiment',
            font: {
                size: 14 
            },
            xanchor: 'left', // Aligned title to the left
            x: 0.1 // Added some space on the left

        },
        height: 400,
        width: 500,
        legend: {
            orientation: 'v', // Set orientation to horizontal
            x: 1, // Set x position to center within the grid
            y: 1 
        },




    };
    let config = {
        responsive: true
    }

    Plotly.newPlot('pieChart1', data7, layout7, config);
});



Plotly.d3.csv("instaSentiment.csv", instaData => {
    // Extracting data from the CSV using unpack
    const negativeSentiment = unpack(instaData, 'Negative');
    const positiveSentiment = unpack(instaData, 'Positive');

    // Defined the trace for the pie chart
    var trace = {
        values: [negativeSentiment[0], positiveSentiment[0]], // Since there's only one row in the CSV
        labels: ['% of Negative Posts', '% of Positive Posts'],
        type: 'pie',
        marker: {
            colors: ['#E1714A', '#FBE295'] // Set custom colors for negative and positive sentiment
        },
        hoverinfo: 'label+percent', //ONLY Show label and percentage on hover
        textinfo: 'none', // Do not show text on the chart

    };


    var data8 = [trace];

    var layout8 = {
        plot_bgcolor: '#FFFAE9',
        paper_bgcolor: '#FFFAE9',
        title: {
            text: 'Instagram Sentiment',
            font: {
                size: 14 
            },
            x: 0.05, // Set x position to align the title to the left
            xanchor: 'left' // Anchored the title to the left
        },
        height: 400,
        width: 500,
        legend: {
            orientation: 'v', // Set orientation to horizontal
            x: 1, // Set x position to center within the grid
            y: 1
        },
        

    };
    let config = {
        responsive: true
    }

    Plotly.newPlot('pieChart2', data8, layout8, config);
});


Plotly.d3.csv("twitterSentiment.csv", twitData => {
    // Extracting data from the CSV using unpack
    const negativeSentiment = unpack(twitData, 'Negative Tweets');
    const positiveSentiment = unpack(twitData, 'Positive Tweets');

    // Defined the trace for the pie chart
    var trace = {
        values: [negativeSentiment[0], positiveSentiment[0]], // Since there's only one row in the CSV
        labels: ['% of Negative Posts', '% of Positive Posts'],
        type: 'pie',
        marker: {
            colors: ['#E1714A', '#FBE295'] // Set custom colors for negative and positive sentiment
        },
        hoverinfo: 'label+percent', // ONLY Show label and percentage on hover
        textinfo: 'none', // Do not show text on the chart

    };


    var data9 = [trace];

    var layout9 = {
        plot_bgcolor: '#FFFAE9',
        paper_bgcolor: '#FFFAE9',
        title: {
            text: 'Twitter Sentiment',
            font: {
                size: 14 
            },
            x: 0.05, // Set x position to align the title to the left
            xanchor: 'left' // Anchor the title to the left
        },
        height: 400,
        width: 500,
        legend: {
            orientation: 'v', // Set orientation to horizontal
            x: 1, // Set x position to center within the grid
            y: 1 
        },
        annotations: [
            {
                x: -0.3,
                y: -0.2,
                xref: 'paper',
                yref: 'paper',
                showarrow: false,
                text: '<a href="https://drive.google.com/file/d/1Ps5AcppvdOId8st_Spa8YcL3sBUFYR-Z/view?usp=sharing">Multiple Data Sources: Kaggle</a>',
                font: {
                    size: 12,
                    color: 'black'
                }
            }
        ],

    };
    let config = {
        responsive: true
    }


    Plotly.newPlot('pieChart3', data9, layout9, config);
});


Plotly.d3.csv("redditSentiment.csv", redditData => {
    // Extracting data from the CSV using unpack
    const negativeSentiment = unpack(redditData, 'negative comments');
    const positiveSentiment = unpack(redditData, 'positive comments');

    // DefineD the trace for the pie chart
    var trace = {
        values: [negativeSentiment[0], positiveSentiment[0]], // Since there's only one row in the CSV
        labels: ['% of Negative Posts', '% of Positive Posts'],
        type: 'pie',
        marker: {
            colors: ['#E1714A', '#FBE295'] // Set custom colors for negative and positive sentiment
        },
        hoverinfo: 'label+percent', // Show label and percentage on hover
        textinfo: 'none', // Do not show text on the chart

    };


    var data10 = [trace];

    var layout10 = {
        plot_bgcolor: '#FFFAE9',
        paper_bgcolor: '#FFFAE9',
        title: {
            text: 'Reddit Sentiment',
            font: {
                size: 14 
            },
            x: 0.05, // Set x position to align the title to the left
            xanchor: 'left' // Anchored the title to the left
        },
        height: 400,
        width: 500,
        legend: {
            orientation: 'v', // Set orientation to horizontal
            x: 1, // Set x position to center within the grid
            y: 1
        },
        

    };

    let config = {
        responsive: true
    }

    Plotly.newPlot('pieChart4', data10, layout10, config);
});










