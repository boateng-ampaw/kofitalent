import Link from 'next/link'

export default function Footer(){
    return (
        <footer>
            <section className='py-5'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-8 mx-auto'>
                            <div className='border-bottom pt-3 pb-3 mb-3'>
                                <h5 className='letter-spacing--05 mb-0 f-400 grey-color'>Do you have any questions?</h5>
                            </div>
        
                            <div className='d-flex justify-content-between align-items-center'>
                                <h3 className='mb-0'>0546.72.72.95</h3>
                                <div>
                                    <Link className='kb-p-btn' href={`tel:+233546727295`}>Click to call</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </footer>
    )
}