import test from 'ava';
import { TypeKind } from 'graphql';

import getFinalType from './getFinalType';

test('returns the correct type for SCALAR types', (t) => {
  t.deepEqual(getFinalType({ name: 'foo', kind: TypeKind.SCALAR }), {
    name: 'foo',
    kind: TypeKind.SCALAR,
  });
});

test('returns the correct type for NON_NULL types', (t) => {
  t.deepEqual(
    getFinalType({
      kind: TypeKind.NON_NULL,
      ofType: { name: 'foo', kind: TypeKind.SCALAR },
    }),
    {
      name: 'foo',
      kind: TypeKind.SCALAR,
    }
  );
});

test('returns the correct type for LIST types', (t) => {
  t.deepEqual(
    getFinalType({
      kind: TypeKind.LIST,
      ofType: { name: 'foo', kind: TypeKind.SCALAR },
    }),
    {
      name: 'foo',
      kind: TypeKind.SCALAR,
    }
  );
});

test('returns the correct type for NON_NULL LIST types', (t) => {
  t.deepEqual(
    getFinalType({
      kind: TypeKind.NON_NULL,
      ofType: {
        kind: TypeKind.LIST,
        ofType: { name: 'foo', kind: TypeKind.SCALAR },
      },
    }),
    { name: 'foo', kind: TypeKind.SCALAR }
  );
});
