import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import useCopyToClipboard from './useCopyToClipboard';

export default function EmailResponseComponent({ response }) {
  const [copyToClipboard, { success }] = useCopyToClipboard();
  return (
    <button
      type="button"
      className="round-btn flex border-2 border-transparent justify-center items-center bg-white/20 hover:border-[#5BBC65]"
      title="Copy Text"
      onClick={() => copyToClipboard(response)}
    >
      {success ? (
        <Icon icon="material-symbols:check-small-rounded" color="white" />
      ) : (
        <Icon icon="material-symbols:content-copy-outline-rounded" color="white" />
      )}
    </button>
  );
}
EmailResponseComponent.propTypes = {
  response: PropTypes.string.isRequired,
};
