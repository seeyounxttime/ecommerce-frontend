const DetailsList = ({ label, data }) => {
  return (
    <div className="flex border-b py-2.5">
      <h4 className="capitalize text-base font-normal text-slate-600">
        {label}:
      </h4>
      <span className="ml-2 font-medium text-slate-900">{data}</span>
    </div>
  );
};

export default DetailsList;
