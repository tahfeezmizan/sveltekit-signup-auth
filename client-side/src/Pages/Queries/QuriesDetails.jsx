import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import AddRecommendation from "./AddRecommendation";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";


const QuriesDetails = () => {
    const [card, setCard] = useState([]);
    const AxiosSecure = useAxiosSecure();
    const { id } = useParams();

    useEffect(() => {
        AxiosSecure.get(`/queriesDetails/${id}`)
            .then(res => {
                setCard(res.data)
            })
    }, [id]);

    return (
        <div className='w-full lg:w-11/12 xl:w-8/12 mx-auto px-4 md:px-6 lg:px-0 py-10'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-10">
                <div className="bg-gray-100 rounded-2xl flex items-center justify-center p-10 mb-6">
                    <img className="max-w-96 max-h-96 rounded" src={card.imageUrl} alt="" />
                </div>

                <div className="">
                    <h2 className="text-4xl font-bold mb-4">{card.queryTitle}</h2>

                    <p className='font-medium pb-6'> <span className="text-gray-500">Date Posted: </span> {card.date}</p>
                    <p className='font-medium text-lg pb-2'> <span className="text-gray-500">Product Name:</span> {card.productName}</p>
                    <p className='font-medium text-lg pb-5'> <span className="text-gray-500">Brand Name:</span> {card.brandName}</p>

                    <div className="py-4 border-t">
                        <p className='font-bold text-xl pb-2'>Boycotting Reason: </p>
                        <p className="font-normal ">{card.boycottingReason}</p>
                    </div>

                    <div className="flex gap-3 items-start py-6">
                        <img src={card.userPhoto} className="rounded-full w-12" alt="" />
                        <div className="">
                            <h2 className="text-lg font-semibold font-Jost capitalize">{card.userName}</h2>
                            <p className="text-gray-500">UnKnown</p>
                        </div>
                    </div>
                </div>
            </div>


            {/* Query Recommendataion Added Section */}

            <div>
                <Tabs isLazy>
                    <TabList>
                        <Tab className="font-Jost text-xl font-semibold">Boycotting Reason</Tab>
                        <Tab className="font-Jost text-xl font-semibold">Add Recommendation</Tab>
                        <Tab className="font-Jost text-xl font-semibold ">Review</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <p className="font-normal ">{card.boycottingReason}</p>
                        </TabPanel>

                        <TabPanel>
                            <AddRecommendation card={card} />
                        </TabPanel>

                        <TabPanel>
                            <p className="text-4xl font-Roboto">Rivew Not Found</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>

        </div>
    );
};

export default QuriesDetails;