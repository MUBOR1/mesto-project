// Константы
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];
  
  // DOM элементы
  const profileName = document.querySelector('.profile__name');
  const profileDescription = document.querySelector('.profile__description');
  const profileEditButton = document.querySelector('.profile__edit-button');
  const profileAddButton = document.querySelector('.profile__add-button');
  const placesList = document.querySelector('.places__list');
  
  // Попапы
  const profilePopup = document.querySelector('.popup_type_edit');
  const cardPopup = document.querySelector('.popup_type_new-card');
  const imagePopup = document.querySelector('.popup_type_image');
  
  // Формы
  const profileForm = document.forms['profile-form'];
  const cardForm = document.forms['card-form'];
  
  // Инпуты форм
  const nameInput = profileForm.querySelector('.popup__input_type_name');
  const descriptionInput = profileForm.querySelector('.popup__input_type_description');
  const cardNameInput = cardForm.querySelector('.popup__input_type_card-name');
  const cardLinkInput = cardForm.querySelector('.popup__input_type_card-link');
  
  // Элементы попапа с картинкой
  const popupImage = imagePopup.querySelector('.popup__image');
  const popupCaption = imagePopup.querySelector('.popup__caption');
  
  // Шаблон карточки
  const cardTemplate = document.querySelector('#card-template').content;
  
  // Функции
  function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeModalByEscape);
  }
  
  function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModalByEscape);
  }
  
  function closeModalByEscape(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened');
      closeModal(openedPopup);
    }
  }
  
  function closeModalByOverlay(evt) {
    if (evt.target === evt.currentTarget) {
      closeModal(evt.currentTarget);
    }
  }
  
  function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closeModal(profilePopup);
  }
  
  function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const newCard = {
      name: cardNameInput.value,
      link: cardLinkInput.value
    };
    placesList.prepend(createCard(newCard));
    cardForm.reset();
    closeModal(cardPopup);
  }
  
  function createCard(cardData) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const likeButton = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.card__delete-button');
  
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
  
    likeButton.addEventListener('click', () => {
      likeButton.classList.toggle('card__like-button_is-active');
    });
  
    deleteButton.addEventListener('click', () => {
      cardElement.remove();
    });
  
    cardImage.addEventListener('click', () => {
      popupImage.src = cardData.link;
      popupImage.alt = cardData.name;
      popupCaption.textContent = cardData.name;
      openModal(imagePopup);
    });
  
    return cardElement;
  }
  
  // Обработчики событий
  profileEditButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
    openModal(profilePopup);
  });
  
  profileAddButton.addEventListener('click', () => {
    openModal(cardPopup);
  });
  
  profileForm.addEventListener('submit', handleProfileFormSubmit);
  cardForm.addEventListener('submit', handleCardFormSubmit);
  
  // Закрытие попапов по клику на оверлей и крестик
  document.querySelectorAll('.popup').forEach(popup => {
    popup.addEventListener('click', closeModalByOverlay);
    popup.querySelector('.popup__close-button').addEventListener('click', () => closeModal(popup));
  });
  
  // Добавление анимации для попапов
  document.querySelectorAll('.popup').forEach(popup => {
    popup.classList.add('popup_is-animated');
  });
  
  // Рендер начальных карточек
  initialCards.forEach(card => {
    placesList.append(createCard(card));
  });