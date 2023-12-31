import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";

import axiosClient from '@/libraries/axiosClient';
import { useRouter } from "next/router";

function ProductDetail(props) {
  const { product } = props;
  // const router = useRouter();

  return (
    <>
      <Head>
        <title>Ban chai da nang</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {product && (
        <main>
          <p>
            <strong>name:</strong> {product.name}
          </p>
          <p>
            <strong>description:</strong> {product.description}
          </p>
          <p>
            <strong>userId:</strong> {product.userId}
          </p>
          <p>
            <strong>Discount:</strong> {product.discount}%
          </p>
          <p>
            <strong>Total:</strong> {product.total}
          </p>
          <p>
            <strong>Supplier name :</strong> {product.supplier.name}
          </p>
          <p>
            <strong>Supplier email :</strong> {product.supplier.email}
          </p>
          <p>
            <strong>Supplier address :</strong> {product.supplier.address}
          </p>
        </main>
      )}
    </>
  );
}

ProductDetail.propTypes = {
  product: PropTypes.instanceOf(Object),
};

ProductDetail.defaultProps = {
  product: {},
};

export default ProductDetail;

// SSR
export async function getServerSideProps(req) {
  try {
    const { params } = req;
    const response = await axiosClient.get(`/products/${params.id}`);

    return {
      props: {
        product: response.data.payload,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
