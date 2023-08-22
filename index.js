const container = document.querySelector('.container');
const pesquisa = document.querySelector('.caixa-pesquisa button');
const caixaClima = document.querySelector('.caixa-clima');
const climaDetalhes = document.querySelector('.clima-detalhes');
const erro404 = document.querySelector('.nao-encontrado');

pesquisa.addEventListener('click', () => {
    const APIKey = '1e246c57eb88fc1aa5fd2d63f2e409ff';
    const cidade = document.querySelector('.caixa-pesquisa input').value;

    if (cidade === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if(json.cod === '404'){
                container.style.height = '400px';
                caixaClima.style.display = 'none';
                climaDetalhes.style.display = 'none';
                erro404.style.display = 'block';
                erro404.classList.add('fadeIn');
                return;
            }

            erro404.style.display = 'none';
            erro404.classList.remove('fadeIn');

            const imagem = document.querySelector('.caixa-clima img');
            const temperatura = document.querySelector('.caixa-clima .temperatura');
            const descricao = document.querySelector('.caixa-clima .descricao');
            const humidade = document.querySelector('.clima-detalhes .humidade span');
            const vento = document.querySelector('.clima-detalhes .vento span');

            switch (json.weather[0].main){
                case 'Clear':
                    imagem.src = 'img/clear.png';
                    break;

                case 'Rain':
                    imagem.src = 'img/rain.png';
                    break;

                case 'Snow':
                    imagem.src = 'img/snow.png';
                    break;

                case 'Clouds':
                    imagem.src = 'img/cloud.png';
                    break;

                case 'Haze':
                    imagem.src = 'img/mist.png';
                    break;

                default:
                    imagem.src = '';    
            }

            temperatura.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            descricao.innerHTML = `${json.weather[0].description}`;
            humidade.innerHTML = `${json.main.humidity}%`;
            vento.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            caixaClima.style.display = '';
            climaDetalhes.style.display = '';
            caixaClima.classList.add('fadeIn');
            climaDetalhes.classList.add('fadeIn');
            container.style.height = '590px';
        });

});