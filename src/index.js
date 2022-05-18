import Chart from 'chart.js/auto'
import ChartDataLabels from 'chartjs-plugin-datalabels'
Chart.register(ChartDataLabels)

const items = {
  yes: {
    label: 'YES',
    count: 12,
    backgroundColor: 'rgba(255, 99, 132, 0.4)',
    borderColor: 'rgb(255, 99, 132)'
  },
  no: {
    label: 'NO',
    count: 12,
    backgroundColor: 'rgba(255, 159, 64, 0.4)',
    borderColor: 'rgb(255, 159, 64)'
  }
}

document.querySelector('#yes').addEventListener('click', () => {
  fetch('/yes', { method: 'POST' }).then(updateData)
})

document.querySelector('#no').addEventListener('click', () => {
  fetch('/no', { method: 'POST' }).then(updateData)
})

const updateData = async () => {
  const response = await fetch('/poll')
  const poll = await response.json()
  items.no.count = poll.no
  items.yes.count = poll.yes
  updateChart()
}

const updateChart = () => {
  localStorage.setItem('voted', true)
  const totalCount = items.no.count + items.yes.count
  document.querySelector('#votes').textContent = `${totalCount} votes`
  document.querySelector('.actions').remove()
  document.querySelector('#chart-container').classList.remove('hide')
  myChart.data.datasets[0].data[0] = Math.round(items.yes.count / totalCount * 100)
  myChart.data.datasets[0].data[1] = Math.round(items.no.count / totalCount * 100)
  myChart.data.datasets[0].data[1] = Math.round(items.no.count / totalCount * 100)
  myChart.data.datasets[0].data[1] = Math.round(items.no.count / totalCount * 100)
  myChart.update()
}

const chartConfig = () => {
  const totalCount = items.no.count + items.yes.count

  const labels = [items.yes.label, items.no.label]
  const data = {
    labels,
    datasets: [{
      label: '',
      data: [Math.round(items.yes.count / totalCount * 100), Math.round(items.no.count / totalCount * 100)],
      backgroundColor: [items.yes.backgroundColor, items.no.backgroundColor],
      borderColor: [items.yes.borderColor, items.no.borderColor],
      borderWidth: 1
    }]
  }

  const config = {
    type: 'bar',
    data,
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        datalabels: {
          color: '#FFFFFF',
          formatter: function (value, context) {
            return value + '%'
          },
          font: {
            size: 26
          },
          anchor: 'end',
          align: 'end'
        }
      },
      layout: {
        padding: 40
      },
      scales: {
        y: {
          display: false,
          beginAtZero: true,
          max: 100,
          min: 0
        },
        x: {
          ticks: {
            color: '#FFFFFF',
            font: {
              size: 24
            }
          }
        }
      }
    }
  }

  return config
}

const myChart = new Chart(
  document.getElementById('myChart'),
  chartConfig()
)

const voted = localStorage.getItem('voted')
if (voted) {
  updateData()
} else {
  document.querySelector('.actions').classList.remove('hide')
}
