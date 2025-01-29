import axiosClient from '../../api/axiosClient';
import MockAdapter from 'axios-mock-adapter';
import { bookService } from './bookService';

const mock = new MockAdapter(axiosClient);

describe('bookService', () => {
  afterEach(() => {
    mock.reset();
  });

  it('debería obtener la lista de libros (getBooks)', async () => {
    const mockResponse = [
      { id: 1, title: 'Book 1' },
      { id: 2, title: 'Book 2' },
    ];

    mock.onGet('/book').reply(200, mockResponse);

    const result = await bookService.getBooks();

    expect(result).toEqual(mockResponse);
    expect(mock.history.get.length).toBe(1);
  });

  it('debería obtener un libro por id (getBook)', async () => {
    const mockResponse = { id: 1, title: 'Book 1' };
    mock.onGet('/book/1').reply(200, mockResponse);

    const result = await bookService.getBook(1);

    expect(result).toEqual(mockResponse);
    expect(mock.history.get.length).toBe(1);
    expect(mock.history.get[0].url).toBe('/book/1');
  });

  it('debería crear un libro (createBook)', async () => {
    const newBook = { title: 'New Book', author: 'John Doe' };
    const mockResponse = { id: 3, ...newBook };

    mock.onPost('/book', newBook).reply(201, mockResponse);

    const result = await bookService.createBook(newBook);

    expect(result).toEqual(mockResponse);
    expect(mock.history.post.length).toBe(1);

    expect(JSON.parse(mock.history.post[0].data)).toEqual(newBook);
  });

  it('debería actualizar un libro (updateBook)', async () => {
    const updatedData = { title: 'Updated Title' };
    const mockResponse = { id: 1, ...updatedData };

    mock.onPut('/book/1', updatedData).reply(200, mockResponse);

    const result = await bookService.updateBook(1, updatedData);

    expect(result).toEqual(mockResponse);
    expect(mock.history.put.length).toBe(1);
    expect(JSON.parse(mock.history.put[0].data)).toEqual(updatedData);
  });

  it('debería eliminar un libro (deleteBook)', async () => {
    const mockResponse = { message: 'Book deleted' };
    mock.onDelete('/book/1').reply(200, mockResponse);

    const result = await bookService.deleteBook(1);

    expect(result).toEqual(mockResponse);
    expect(mock.history.delete.length).toBe(1);
    expect(mock.history.delete[0].url).toBe('/book/1');
  });

  it('debería buscar libros (searchBooks)', async () => {
    const queryString = '?title=React';
    const mockResponse = [
      { id: 1, title: 'React in Action' },
      { id: 2, title: 'Learning React' },
    ];

    mock.onGet(`/book/search${queryString}`).reply(200, mockResponse);

    const result = await bookService.searchBooks(queryString);

    expect(result).toEqual(mockResponse);
    expect(mock.history.get.length).toBe(1);
    expect(mock.history.get[0].url).toBe(`/book/search${queryString}`);
  });
});
