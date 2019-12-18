import React from 'react';

import config from '../../utils/config';
import {
  Divider,
  InputGroup,
  SelectGroup,
  SelectSearchGroup,
} from '../elements';

export default function ItemInfoForm(props) {
  const { formik, groupOptions } = props;

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="columns is-multiline">
        <div className="column is-half">
          <InputGroup
            label="Item Name"
            id="name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            error={formik.errors.name}
          />
        </div>
        <div className="column is-half">
          <SelectSearchGroup
            label="Item Group"
            id="group"
            name="group"
            onChange={val => {
              formik.setFieldValue('group', val);
              formik.setFieldValue('sgst', val.itemObj.sgst);
              formik.setFieldValue('cgst', val.itemObj.sgst);
              formik.setFieldValue('igst', val.itemObj.sgst * 2);
            }}
            value={formik.values.group}
            options={groupOptions}
            error={formik.errors.group}
          />
        </div>
        <Divider />
        <div className="column is-half">
          <InputGroup
            label="Item Code"
            id="code"
            name="code"
            onChange={formik.handleChange}
            value={formik.values.code}
            error={formik.errors.code}
          />
        </div>
        <div className="column is-half">
          <SelectGroup
            label="Units"
            placeholder="Select"
            id="units"
            name="units"
            onChange={formik.handleChange}
            value={formik.values.units}
            options={config.itemUnits}
            error={formik.errors.units}
          />
        </div>
        <div className="column is-half">
          <InputGroup
            type="number"
            label="Price"
            id="price"
            name="price"
            onChange={formik.handleChange}
            value={formik.values.price}
            error={formik.errors.price}
          />
        </div>
        <div className="column is-half" />
        <Divider />
        <div className="column is-half">
          <InputGroup
            label="HSN Code"
            id="hsnCode"
            name="hsnCode"
            onChange={formik.handleChange}
            value={formik.values.hsnCode}
            error={formik.errors.hsnCode}
          />
        </div>
        <div className="column is-half" />
        <div className="column is-one-third">
          <InputGroup
            type="number"
            label="SGST %"
            id="sgst"
            name="sgst"
            onChange={formik.handleChange}
            value={formik.values.sgst}
            onBlur={() => {
              formik.setFieldValue('cgst', formik.values.sgst);
              formik.setFieldValue('igst', formik.values.sgst * 2);
            }}
            error={formik.errors.sgst}
          />
        </div>
        <div className="column is-one-third">
          <InputGroup
            readOnly
            type="number"
            label="CGST %"
            id="cgst"
            name="cgst"
            onChange={formik.handleChange}
            value={formik.values.cgst}
            error={formik.errors.cgst}
          />
        </div>
        <div className="column is-one-third">
          <InputGroup
            readOnly
            type="number"
            label="IGST %"
            id="igst"
            name="igst"
            onChange={formik.handleChange}
            value={formik.values.igst}
            error={formik.errors.igst}
          />
        </div>
      </div>
    </form>
  );
}
