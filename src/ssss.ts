import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import authenticator from './utils/Auth/authenticator'
import { MiddlewareFactory } from './middlewares/types';
import { orgAuth } from './middlewares/orgAuth';
import { stackMiddlewares } from './middlewares/stackhandler';
import { memberAuth } from './middlewares/memberAuth';


const middlewares = [orgAuth, memberAuth];

export default stackMiddlewares(middlewares);

 

