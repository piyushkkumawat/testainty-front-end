import { images } from '../../Constants/image.constant';
import { t } from 'i18next';
const DataNotFound = () => {
    return (
        <div className="bg-white w-2/3 m-auto  rounded shadow">
            <div className="flex justify-center ">
                <img src={images?.DataNotFound} alt="404" />
            </div>
            <div className="flex justify-center py-2">
                <h5 className="text-gray-500">{t('Data Not Found!')}</h5>
            </div>
        </div>
    )
}

export default DataNotFound