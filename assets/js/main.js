const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE = "MIU_PLAYER";

const playlist = $('.playlist');
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const player = $('.player');
const cd = $('.cd');
const playBtn = $('.btn-toggle-play');
const progress = $('#progress');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const volume = $('#progress-volume');
const iconVolume = $(".control-volume-group .btn-volume i");
const btnLove = $(".btn-love");
const audioMissYou = $('#audioMissYou');
const appleTouchIcon = $('link[rel="apple-touch-icon"]');
const fluidIcon = $('link[rel="fluid-icon"]');

const app = {
    currentIndex : 0,
    isPlaying : false,
    isRandom : false,
    isRepeat : false,
    volume : 1,
    config : JSON.parse(localStorage.getItem(PLAYER_STORAGE)) || {},
    setConfig : function(key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE, JSON.stringify(this.config))
    },

    songs : [
        {
            name: "Có Miu bên đời bỗng vui",
            singer: "Chillies",
            path: "./assets/musics/CoEmDoiBongVui-Chillies-6217930.mp3",
            image: "./assets/img/co-miu-ben-doi-bong-vui.png"
        },
        {
            name: "Qua khung cửa sổ",
            singer: "Chillies",
            path: "./assets/musics/QuaKhungCuaSo-Chillies-6811489.mp3",
            image: "./assets/img/qua-khung-cua-so.png"
        },
        {
            name: "Những con đường song song",
            singer: "Chillies",
            path: "./assets/musics/NhungConDuongSongSong-Chillies-6467569.mp3",
            image: "./assets/img/nhung-con-duong-song-song.png"
        },
        {
            name: "Mascara",
            singer: "Chillies",
            path: "./assets/musics/Mascara-Chillies-6467676.mp3",
            image: "./assets/img/mascara.png"
        },
        {
            name: "Nếu ngày mai không đến",
            singer: "Chillies",
            path: "./assets/musics/NeuNgayMaiKhongDen-Chillies-6467646.mp3",
            image: "./assets/img/neu-ngay-mai-khong-den.png"
        },
        {
            name: "Vùng ký ức",
            singer: "Chillies",
            path: "./assets/musics/VungKyUc-Chillies-6278528.mp3",
            image: "./assets/img/vung-ky-uc.png"
        },
        {
            name: "Giá như",
            singer: "Chillies",
            path: "./assets/musics/GiaNhu-Chillies-7016096.mp3",
            image: "./assets/img/gia-nhu.png"
        },
        {
            name: "Shay nắng",
            singer: "AMEE, Obito",
            path: "./assets/musics/ShayNanggg-AMEEObito-7406703.mp3",
            image: "./assets/img/shay-nang.png"
        },
        {
            name: "Hẹn ước từ hư vô",
            singer: "Mỹ Tâm",
            path: "./assets/musics/HenUocTuHuVoLive-MyTam.mp3",
            image: "./assets/img/hen-uoc-tu-hu-vo.png"
        },
        {
            name: "CHƯA QUÊN NGƯỜI YÊU CŨ",
            singer: "HÀ NHI X HỨA KIM TUYỀN",
            path: "./assets/musics/CHUA-QUEN-NGUOI-YEU-CU_HA-NHIxHUA-KIM-TUYEN.mp3",
            image: "./assets/img/CHUA-QUEN-NGUOI-YEU-CU_HA-NHIxHUA-KIM-TUYEN.jpg"
        },
        {
            name: "Ing...  (Now, We Are Breaking Up Ost)",
            singer: "Lee MinHyuk, Boramiyu",
            path: "./assets/musics/IngNowWeAreBreakingUpOst-LeeMinHyukBoramiyu-7128102.mp3",
            image: "./assets/img/ing.png"
        },
        {
            name: "Kiêu ngạo",
            singer: "囂張",
            path: "./assets/musics/KieuNgao-EN-6127721.mp3",
            image: "./assets/img/kieu-ngao.png"
        },
        {
            name: "Phi điểu và ve sầu",
            singer: "飞鸟和蝉 - Nhậm Nhiên",
            path: "./assets/musics/PhiDieuVaVeSau-NhamNhien-6321767.mp3",
            image: "./assets/img/phi-dieu-va-ve-sau.png"
        },
        {
            name: "Xuân tam nguyệt",
            singer: "春三月 - Tư Nam",
            path: "./assets/musics/XuanTamNguyet-TuNamTiNa-6946201.mp3",
            image: "./assets/img/xuan-tam-nguyet.png"
        },
        {
            name: "Nổi gió rồi",
            singer: "Vượng Tử Tiểu Kiều",
            path: "./assets/musics/NoiGioRoi-VuongTuTieuKieu-7614043.mp3",
            image: "./assets/img/noi-gio-roi.png"
        },
        {
            name: "Vây giữ",
            singer: "Vượng Tử Tiểu Kiều",
            path: "./assets/musics/VayGiu-VuongTuTieuKieu-7021510.mp3",
            image: "./assets/img/vay-giu.png"
        },
        {
            name: "Mạc Vấn Quy Kỳ",
            singer: "莫问归期 - Tưởng Tuyết Nhi (Cher Chiang)",
            path: "./assets/musics/MacVanQuyKy-TuongTuyetNhiCherChiang-6128795.mp3",
            image: "./assets/img/mac-van-quy-ky.png"
        },
        {
            name: "Trích Tiên",
            singer: "Y Cách Tái Thính (Yi Ge Sai Ting)",
            path: "./assets/musics/TrichTien-YCachTaiThinhYiGeSaiTingDiepLy-6272323.mp3",
            image: "./assets/img/trich-tien.png"
        },
        {
            name: "Đào Hoa Nặc / 桃花诺 (Thượng Cổ Tình Ca OST)",
            singer: "G.E.M (Đặng Tử Kỳ)",
            path: "./assets/musics/DaoHoaNacThuongCoTinhCaOST-GEMDangTuKy-5011028.mp3",
            image: "./assets/img/dao-hoa-nac.jpg"
        },
    ],

    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${
                index === this.currentIndex ? "active" : ""
              }" data-index="${index}">
                  <div class="thumb"
                      style="background-image: url('${song.image}')">
                  </div>
                  <div class="body">
                      <h3 class="title">${song.name}</h3>
                      <p class="author">${song.singer}</p>
                  </div>
                  <div class="option">
                      <i class="fas fa-heart"></i>
                      
                  </div>
              </div>
            `;
        });
        playlist.innerHTML = htmls.join('');
    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get : function() {
                return this.songs[this.currentIndex];
            }
        });
    },
    handleEvent: function() {
        const _this = this;
        const cdWidth = cd.offsetWidth;

        // handle cd animation play/pause audio
        const cdThumbAnimate =  cdThumb.animate([
            { transform: 'rotate(360deg)'}
        ], { 
            duration : 10000,
            iterations : Infinity
        })

        cdThumbAnimate.pause();

        // handle hidden or show thumb image
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        }

        playBtn.onclick = function() {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        }

        // when song playing
        audio.onplay = function() {
            _this.isPlaying = true;
            player.classList.add('playing');
            cdThumbAnimate.play();
        }

        // when song pause
        audio.onpause = function() {
            _this.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimate.pause();
        }

        // when time update audio
        audio.ontimeupdate = function() {
            if(audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                progress.value = progressPercent;
            }
            }
            
        // when progress on change
        progress.onchange = function(e) {
            audio.pause();
            const seekTime = audio.duration / 100 * e.target.value;
            audio.currentTime = seekTime;
            audio.play();

        }

        // next song
        nextBtn.onclick = function() {
            _this.playNextSong();
        }

        // prev song
        prevBtn.onclick = function() {
            _this.playPrevSong();
        }
        
        // random song
        randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom;
            _this.setConfig('isRandom', _this.isRandom);
            randomBtn.classList.toggle('active', _this.isRandom);
        }


        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat;
            _this.setConfig('isRepeat', _this.isRepeat);
            repeatBtn.classList.toggle('active', _this.isRepeat);
        }

        // next song when the song is ended
        audio.onended = function() {
            if(_this.isRepeat) {
                audio.play();
            } else {
                _this.playNextSong();
            }
        }

        playlist.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)');
            if(songNode || e.target.closest('.option')) {
                if(songNode) {
                    _this.currentIndex = Number(songNode.dataset.index);
                    _this.setConfig('currentIndex', _this.currentIndex);
                    _this.loadCurrentSong();
                    _this.render();
                    audio.play();
                }

                if(e.target.closest('.option')) {

                }
            }
        }

        // change volume for songs
        volume.onchange = function(e) {
            _this.changeVolume(e.target.value / 100);
        }

        btnLove.onclick = function() {
            audioMissYou.play();
        }

        // add event key up
        onkeyup = (event) => {
            if(event.code === "Space") {
                document.body.style.overflow = "auto";
                playBtn.click();
            }

            if(event.code === "ArrowRight") {
                _this.playNextSong();
            }

            if(event.code === "ArrowLeft") {
                _this.playPrevSong();
            }
        };

        // add event key down
        onkeydown = (event) => {
            if(event.code === "Space") {
                document.body.style.overflow = "hidden";
            }
        }
    },
    loadCurrentSong : function() {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
        this.updateTitle(this.currentSong.name);
        appleTouchIcon.href = this.currentSong.image;
        fluidIcon.href = this.currentSong.image;

    },
    nextSong : function() {
        this.currentIndex++;
        this.setConfig('currentIndex', this.currentIndex);
        if(this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    playNextSong : function() {
        if(this.isRandom) {
            this.playRandomSong();
        } else {
            this.nextSong();
        }
        audio.play();
        this.render();
        this.scrollToActiveSong();
    },
    prevSong: function() {
        this.currentIndex--;
        this.setConfig('currentIndex', this.currentIndex);
        if(this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    playPrevSong : function() {
        if(this.isRandom) {
            this.playRandomSong();
        } else {
            this.prevSong();
        }
        audio.play();
        this.render();
        this.scrollToActiveSong();
    },
    playRandomSong : function() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while(newIndex === this.currentIndex);

        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },
    changeVolume: function(value) {
        value = parseFloat(value);
        this.setConfig('volume', value);
        audio.volume = value;
        let isMute = value == 0 ? true : false;

        iconVolume.classList.toggle('fa-volume-mute', isMute);
        iconVolume.classList.toggle('fa-volume-up', !isMute);
    },
    loadConfig : function() {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
        this.volume = this.config.volume;
        this.currentIndex = this.config.currentIndex ?? 0;
    },
    updateTitle : function(title) {
        document.title = `♥ SpotiMiu ♥ ${title}`;
    },
    scrollToActiveSong : function() {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 300);
    },
    start : function() {
        // load config
        this.loadConfig();

        // define properties
        this.defineProperties();

        // handle event
        this.handleEvent();

        // load song on first load
        this.loadCurrentSong();

        // render playlist
        this.render();

        // load volume
        this.changeVolume(this.volume ?? 1);

        randomBtn.classList.toggle('active', this.isRandom ?? false);
        repeatBtn.classList.toggle('active', this.isRepeat ?? false);
        volume.value = (this.volume ?? 1) * 100;
    }

}

app.start();