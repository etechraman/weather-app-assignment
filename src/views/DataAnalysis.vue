<template>
  <div class="main">
    <div class="mainContainer">
      <div class="title">
        Data Analysis
        <hr />
      </div>
      <apexchart
        type="line"
        height="400"
        :options="chartOptions"
        :series="series"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import VueApexCharts from "vue-apexcharts";

export default {
  name: "DataAnalysis",
  components: { apexchart: VueApexCharts },
  data() {
    return {
      series: [
        {
          name: "Men",
          data: [106898, 103937, 99492, 87213, 101943, 118848, 103120],
        },
        {
          name: "Women",
          data: [97516, 94796, 91818, 79673, 94684, 110633, 95993],
        },
      ],
      chartOptions: {
        chart: {
          height: 800,
          type: "line",
          dropShadow: {
            enabled: true,
            color: "#000",
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2,
          },
          toolbar: {
            show: false,
          },
        },
        colors: ["#77B6EA", "#545454"],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
        },
        title: {
          text: "Birth in Taiwan",
          align: "center",
        },
        subtitle: {
          text: "Source: Ministry of the Interior",
          align: "center",
        },
        grid: {
          borderColor: "#e7e7e7",
          row: {
            colors: ["transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        markers: {
          size: 7,
        },
        xaxis: {
          categories: ["2007", "2008", "2009", "2010", "2011", "2012", "2013"],
          title: {
            text: "Year",
          },
        },
        yaxis: {
          labels: {
            formatter: function(value) {
              return value / 1000 + "k";
            },
          },
          title: {
            text: "People",
          },
          tickAmount: 6,
          min: 70000,
          max: 130000,
        },
        legend: {
          position: "top",
          horizontalAlign: "right",
        },
      },
    };
  },
};
</script>
<style>
.main {
  padding-left: 0.5%;
}
.mainContainer {
  margin-left: 12px;
  margin-right: 12px;
}
.title {
  padding: 10px 0px;
  padding-bottom: 5px;
  font-size: 30px;
}
.title hr {
  margin-top: 0px;
  margin-bottom: 0px;
  border: 1px solid #000000;
}
@media screen and (max-width: 900px) {
  .main {
    padding-left: 0.5%;
  }
}
</style>
