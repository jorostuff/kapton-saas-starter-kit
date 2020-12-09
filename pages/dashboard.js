import Navbar from '../assets/Navbar';
import { authCheckRedirect } from '../assets/AuthContext';
import { Bar, Doughnut, Line, Scatter } from 'react-chartjs-2';
import { Grid, GridItem, useColorModeValue } from '@chakra-ui/react';

const barGraph = () => {
	const data = {
	  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
	  datasets: [{
	    label: '# of requests',
	    data: [750, 510, 220, 415, 120, 250],
	    backgroundColor: [
	      'rgba(255, 99, 132, 0.2)',
	      'rgba(54, 162, 235, 0.2)',
	      'rgba(255, 206, 86, 0.2)',
	      'rgba(75, 192, 192, 0.2)',
	      'rgba(153, 102, 255, 0.2)',
	      'rgba(255, 159, 64, 0.2)'
	    ],
	    borderColor: [
	      'rgba(255, 99, 132, 1)',
	      'rgba(54, 162, 235, 1)',
	      'rgba(255, 206, 86, 1)',
	      'rgba(75, 192, 192, 1)',
	      'rgba(153, 102, 255, 1)',
	      'rgba(255, 159, 64, 1)'
	    ],
	    borderWidth: 1
	  }]
	}
	return(
		<Bar data={data} />
	);
}

const doughnutGraph = () => {
	const data = {
	  labels: [
	    'Red',
	    'Green',
	    'Yellow'
		],
		datasets: [{
		  data: [300, 50, 100],
		  backgroundColor: [
		  '#FF6384',
		  '#36A2EB',
		  '#FFCE56'
		  ],
		  hoverBackgroundColor: [
		  '#FF6384',
		  '#36A2EB',
		  '#FFCE56'
		  ]
		}]
	};
	return(
		<Doughnut data={data} />
	);
}

const lineGraph = () => {
	const data = {
	  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
	  datasets: [{
	  	label: 'Revenue',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    }]
	};
	return(
		<Line data={data} />
	);
}

const scatterPlot = () => {
	const data = {
	  labels: ['Scatter'],
	  datasets: [{
	  	label: 'Sales',
      fill: false,
      backgroundColor: 'rgba(75,192,192,0.4)',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 5,
      pointHoverRadius: 10,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [
        { x: 65, y: 75 },
        { x: 59, y: 49 },
        { x: 80, y: 90 },
        { x: 81, y: 29 },
        { x: 56, y: 36 },
        { x: 55, y: 25 },
        { x: 40, y: 18 },
      ]
    }]
	};
	return(
		<Scatter data={data} />
	);
}

export default function Dashboard() {
	const classes = {
		item: {
			background: useColorModeValue("white", "#1e1e1e"),
			borderRadius: "10px",
			boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
			padding: "10px",
		}
	}
	return(
		<Navbar>
			<Grid p={{base: 0, lg: 3}} gap={3} templateColumns="repeat(4, 1fr)">
				<GridItem style={classes.item} colSpan={{base: 4, lg: 2}}>{barGraph()}</GridItem>
				<GridItem style={classes.item} colSpan={{base: 4, lg: 2}}>{doughnutGraph()}</GridItem>
				<GridItem style={classes.item} colSpan={{base: 4, lg: 2}}>{lineGraph()}</GridItem>
				<GridItem style={classes.item} colSpan={{base: 4, lg: 2}}>{scatterPlot()}</GridItem>
      </Grid>
		</Navbar>
	);
}

Dashboard.getInitialProps = async context => {
	const token = await authCheckRedirect(true, "/", context);
	return { token };
}