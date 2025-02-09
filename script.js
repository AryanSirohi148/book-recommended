// Function to fetch books from Google Books API based on user search
function searchBooks(query) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const books = data.items;
        displayBooks(books);
      })
      .catch(error => console.error('Error fetching data:', error));
  }
  
  // Function to display books on the page
  function displayBooks(books) {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';  // Clear any previous results
  
    books.forEach(book => {
      const bookElement = document.createElement('div');
      bookElement.classList.add('book-card');
  
      // Fetching and shortening the summary for display
      const summary = book.volumeInfo.description ? book.volumeInfo.description : 'No summary available';
      const shortSummary = summary.length > 300 ? summary.substring(0, 300) + '...' : summary;
  
      bookElement.innerHTML = `
        <img src="${book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150'}" alt="${book.volumeInfo.title}" />
        <div class="book-details">
          <h3>${book.volumeInfo.title}</h3>
          <p>${book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown author'}</p>
          <p class="short-summary">${shortSummary}</p>
          <div class="links">
            <a href="${book.volumeInfo.infoLink}" class="book-link" target="_blank">More Info</a>
            <a href="https://www.amazon.com/s?k=${encodeURIComponent(book.volumeInfo.title)}" class="book-link" target="_blank">Amazon</a>
          </div>
          <p class="summary-expanded">${summary}</p>
        </div>
      `;
      bookList.appendChild(bookElement);
    });
  }
  
  // Fetching the top 20 featured books when the page loads
  function fetchFeaturedBooks() {
    const url = 'https://www.googleapis.com/books/v1/volumes?q=bestsellers&maxResults=20';
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const books = data.items;
        displayFeaturedBooks(books);
      })
      .catch(error => console.error('Error fetching featured books:', error));
  }
  
  // Function to display featured books on the page
  function displayFeaturedBooks(books) {
    const featuredSection = document.getElementById('featured-books');
    books.forEach(book => {
      const bookElement = document.createElement('div');
      bookElement.classList.add('book-card');
  
      // Fetching and shortening the summary for display
      const summary = book.volumeInfo.description ? book.volumeInfo.description : 'No summary available';
      const shortSummary = summary.length > 300 ? summary.substring(0, 300) + '...' : summary;
  
      bookElement.innerHTML = `
        <img src="${book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150'}" alt="${book.volumeInfo.title}" />
        <div class="book-details">
          <h3>${book.volumeInfo.title}</h3>
          <p>${book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown author'}</p>
          <p class="short-summary">${shortSummary}</p>
          <div class="links">
            <a href="${book.volumeInfo.infoLink}" class="book-link" target="_blank">More Info</a>
            <a href="https://www.amazon.com/s?k=${encodeURIComponent(book.volumeInfo.title)}" class="book-link" target="_blank">Amazon</a>
          </div>
          <p class="summary-expanded">${summary}</p>
        </div>
      `;
      featuredSection.appendChild(bookElement);
    });
  }
  
  // Listen for search input
  document.getElementById('search-bar').addEventListener('input', (e) => {
    const query = e.target.value;
    if (query) {
      document.getElementById('featured-books').innerHTML = '';  // Clear featured books when searching
      searchBooks(query);
    } else {
      document.getElementById('book-list').innerHTML = '';  // Clear search results when input is empty
      fetchFeaturedBooks();  // Re-fetch featured books when search is cleared
    }
  });
  
  // go to home page when click on logo
  let logo = document.querySelector('#logo');
  logo.addEventListener('click', function () {
    let bookList = document.querySelector('#book-list');
    bookList.innerHTML = "";
    fetchFeaturedBooks();  // Fetch the featured books again
  });
  
  // Initial fetch of featured books
  fetchFeaturedBooks();
