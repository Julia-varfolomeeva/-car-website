import { Swiper, Parallax , Mousewheel, Controller, Pagination, Scrollbar, Navigation} from 'swiper'//добавляем к сваперу модуль паралакс в {}, и  Mousewheel(при скроле колеса мышки открывается ледующий слайд)
Swiper.use([ Parallax , Mousewheel, Controller, Pagination, Scrollbar, Navigation ]) 

import { gsap, Power2 } from 'gsap'//импорт модуля gsap для анимации, переходим в терминал и импортируем модуль , пишем npm i gsap, далее подключаем его здесь
import MicroModal from 'micromodal'//импортируем микромодал npm i micromodal в терминал, затем в JS

document.addEventListener('DOMContentLoaded', () => {

	//Micromodal
	MicroModal.init({//смотрим в документации как его подключить и работать
		openTrigger: 'data-micromodal-open',
		closeTrigger: 'data-micromodal-close',//рекомендованно прописывать 
		disableFocus: true ,//отключает автофокус а форму
		disableScroll: true,
		awaitOpenAnimation: true,// плавность изчезновения окна
		awaitCloseAnimation: true


	})

	//Swiper

 const swiperIMG =  new Swiper	('.slider-img',{
	 loop: false, 
	 speed: 2400,
	 parallax: true,
	 pagination: { //добавили когда нужно было вывести общее количество страниц, обращаемся к погинации, так как в нем есть количесво страниц
	 el:'.slider-pagination-count .total',// после написания данной строчки появляются точки на месте цифры, втрока в htbl долдна ьыть пустой . Таким образом мы выбираем селектор
	 type: 'custom', //Тип параметров CUSTOM предоставляет разработчику полную свободу кастомизации. Например, есть какой-то системный или сторонний компонент. В зависимости от шаблона возникает необходимость добавить к компоненту какие-то свои настройки.
	 renderCustom: function(swiper, current, total){// мы должны отпределить все переменные
		let totalRes = total >= 10 ? total :`0${total}`//нужно для того чтобы, если больше 10 сдайдов, не писать 011 или 025 например, а просто 11 и 25
		return totalRes// 0-это текстовая конкатенация, ${total}-интерполяция для выведения цифры
		
	 }
	 }
	 

    })
    const swiperText = new Swiper('.slider-text', {//создаем новый слайдер и назначаем ему селектору слайдер-текст
	loop: false,
	speed: 2400,
	  mousewheel: {
		invert: false,// скрол роликом мышки вниз

	 },
	 pagination: { //после добавления модулей наверху в двух местах,обращаемся к погинации, и добавляем ее к классу
		el: '.swiper-pagination', //элемент:'.класс'
		clickable: true//создаем кликабельные точки(появятся три точки)
	 },
	 scrollbar: {
		el: '.swiper-scrollbar',
		draggable: true //управление скролом при помощи удерживания и передвижения мышью

	 },
	 navigation: {// добавляем новигацию, в HTML(после добавлени технических классов swiper-button-prev и swiper-button-next, )
		prevEl: '.swiper-button-prev',// указываем класс при клике на котрый открывается предыдущий сдайд
		nextEl: '.swiper-button-next'// указываем класс при клике на котрый открывается след сдайд
		
	 }

   })

   swiperIMG.controller.control = swiperText //связываем слайды свайпер IMG к свайпер текст
   swiperText.controller.control = swiperIMG //и наоборот

// Gear
   let gear = document.querySelector('.slider-gear')

   swiperText.on('slideNextTransitionStart', function() {
	 gsap.to(gear, 2.8, {
		rotation: '+=40', //прибавляем +20 градусов
		ease: Power2.easeOut // замедление колеса под конец ращения
	})
   })

   swiperText.on('slidePrevTransitionStart', function() {
	gsap.to(gear, 2.8, {
	   rotation: '-=40', //прибавляем +20 градусов
	   ease: Power2.easeOut // замедление колеса под конец ращения
   })
  })

  //slide change

 	let curnum = document.querySelector('.slider-pagination-count .current'),
  		pagcur = document.querySelector('.slider-pagination-current__num')

swiperText.on('slideChange', function(){//из документации свайп, берем свойство slideChange
	let ind = swiperText.realIndex + 1, //с помошью console.log(ind) ,проверяем в консоли, изменение номера  слайдов при перелистывании
	   indRes = ind >= 10 ? ind : `0${ind}` //нужно для того чтобы, если больше 10 сдайдов, не писать 011 или 025 например, а просто 11 и 25
	gsap.to(curnum, .2,{//чтобы цифра уходила наверх,
		force3D: true, 
		y:-10,
		opacity: 0,// и теряла свою непрозрачность
		ease: Power2.easeOut,
		onComplete: function() {
			gsap.to(curnum, .1, {
				force3D: true,
				y:10, //чтобы цифра выходила снизу

			})
			curnum.innerHTML = indRes// меняет число !!!!!
			pagcur.innerHTML = indRes

		}

	})
	gsap.to(curnum, .2, {
		force3D: true, 
		y:0,
		opacity: 1 ,
		ease: Power2.easeOut,
		delay: .3 //задержка по времени
	})
	
})

//Cursor

	const body = document.querySelector('body'),
		 cursor = document.getElementById('cursor'),
		 links = document.getElementsByTagName('a')//так как при наведении на ссылки меняется форма курсора

	let mouseX = 0, mouseY = 0, posX = 0, posY = 0

	//с использованием позиции курсора в браузере
	function mouseCoords(e) {
		mouseX = e.pageX
		mouseY = e.pageY
	}
	// привяжем круглешок к курсору мыши
	gsap.to({}, .01, {
		repeat: -1,
		onRepeat: () => {
			posX += (mouseX - posX) / 6
			posY += (mouseY - posY) / 6
			gsap.set(cursor, {
				css: {
					left: posX,
					top:posY
				}	
			})
		}
	})
	for(let i = 0; i < links.length; i++){//проходим по всем ссылкам в документе
		links[i].addEventListener('mouseover', () => {//links[конкретная ссылка ] .при наыедении мыши и выполним функцию
			cursor.classList.add('active')//добавляем курсору доролнительный класс

		})
		links[i].addEventListener('mouseout', () => {//links[конкретная ссылка ] .при  уходе  мыши с сылки и выполним функцию
			
			cursor.classList.remove('active')//убираем курсор

		})


	}


    //  движение по мыши 
	body.addEventListener('mousemove', e => {
		mouseCoords(e)
		cursor.classList.remove('hidden')

	})
	 //  убрать курсор при выходе за граница окна браузера
	 body.addEventListener('mouseout', e => {
		cursor.classList.add('hidden')//добавляем класс хиден

	})







})
