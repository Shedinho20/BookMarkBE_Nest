import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { LoginRequest, RegisterRequest } from 'src/Modules/auth/dto';
import { EditUserRequest } from 'src/Modules/user/dto/user.dto';
import { CreateBookmarkRequest, EditBookmarkRequest } from 'src/Presistence/Interfaces/bookmarkRepository.interface';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('App end 2 end testing', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);
    prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    describe('Register', () => {
      const registerRequest: RegisterRequest = {
        email: 'shedinhoshedra@gmail.com',
        password: '1223321111111',
      };

      it('should throw an error if no email is provided', () => {
        const result = pactum
          .spec()
          .post('/auth/register')
          .withBody({ ...registerRequest, email: '' });

        result.expectStatus(400);

        return result;
      });

      it('should register a user', () => {
        const result = pactum.spec().post('/auth/register').withBody(registerRequest);

        result.expectStatus(201);

        return result;
      });
    });

    describe('Signin', () => {
      const loginRequest: LoginRequest = {
        email: 'shedinhoshedra@gmail.com',
        password: '1223321111111',
      };

      it('should throw error for wrong password', () => {
        const result = pactum
          .spec()
          .post('/auth/login')
          .withBody({ ...loginRequest, password: '12' });

        result.expectStatus(400);

        return result;
      });

      it('should login a user', () => {
        const result = pactum.spec().post('/auth/login').withBody(loginRequest).stores('userToken', 'token');

        result.expectStatus(200);
        return result;
      });
    });
  });

  describe('User', () => {
    describe('Get user in section', () => {
      it('should return user in section', () => {
        const result = pactum.spec().get('/user').withHeaders({ Authorization: 'Bearer $S{userToken}' });

        result.expectStatus(200);

        return result;
      });
    });

    describe('Edit user info', () => {
      it('should update user info', () => {
        const request: EditUserRequest = {
          firstname: 'John',
        };

        const result = pactum
          .spec()
          .patch('/user')
          .withBody(request)
          .withHeaders({ Authorization: 'Bearer $S{userToken}' });

        result.expectStatus(200);
        result.expectBodyContains(request.firstname);

        return result;
      });
    });
  });

  describe('Bookmark', () => {
    describe('Get empty bookmarks', () => {
      it('should get bookmarks', async () => {
        const result = pactum.spec().get('/bookmarks').withHeaders({ Authorization: 'Bearer $S{userToken}' });

        result.expectStatus(200);
        result.expectBody([]);

        return result;
      });
    });

    describe('Create book', () => {
      it('should create a bookmark', () => {
        const request: CreateBookmarkRequest = {
          title: 'John wick 4',
          link: 'http://solarmovie.com',
        };

        const result = pactum
          .spec()
          .post('/bookmarks')
          .withBody(request)
          .withHeaders({ Authorization: 'Bearer $S{userToken}' })
          .stores('bookmarkId', 'id');

        result.expectStatus(201);

        return result;
      });
    });

    describe('Get created bookmarks', () => {
      it('should get bookmarks', () => {
        const result = pactum.spec().get('/bookmarks').withHeaders({ Authorization: 'Bearer $S{userToken}' });

        result.expectStatus(200);
        result.expectJsonLength(1);

        return result;
      });
    });

    /**
     * @parma id is stored in the pactum store from
     * Create bookmark
     */
    describe('Get bookmark by id ', () => {
      it('should get bookmark by id', () => {
        const result = pactum
          .spec()
          .get('/bookmarks/{id}')
          .withPathParams('id', '$S{bookmarkId}')
          .withHeaders({ Authorization: 'Bearer $S{userToken}' });

        result.expectStatus(200);
        result.expectBodyContains('$S{bookmarkId}');

        return result;
      });
    });
    describe('Edit bookmark by id', () => {
      const editBookmarkRequest: EditBookmarkRequest = {
        title: 'Full Beginners Tutorial React and ASP.NET MVC',
        description: 'Learn with shedinho',
      };

      it('should edit bookmark', () => {
        const result = pactum
          .spec()
          .patch('/bookmarks/{id}')
          .withPathParams('id', '$S{bookmarkId}')
          .withHeaders({ Authorization: 'Bearer $S{userToken}' })
          .withBody(editBookmarkRequest);

        result.expectStatus(200);
        result.expectBodyContains(editBookmarkRequest.title);
        result.expectBodyContains(editBookmarkRequest.description);

        return result;
      });
    });

    describe('Delete bookmark by id', () => {
      it('should delete bookmark', () => {
        const result = pactum
          .spec()
          .delete('/bookmarks/{id}')
          .withPathParams('id', '$S{bookmarkId}')
          .withHeaders({ Authorization: 'Bearer $S{userToken}' });

        result.expectStatus(204);

        return result;
      });
    });
  });
});
